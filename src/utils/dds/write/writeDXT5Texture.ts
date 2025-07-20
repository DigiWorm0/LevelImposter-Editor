import {calculateColorIndex, getMaxColor, getMinColor} from "./writeDXT1Texture";
import {DDSHeader} from "../../../types/generic/DDSHeader";

const BLOCK_SIZE = 16;

/**
 * Writes a DXT5 texture to a buffer and returns the buffer.
 * @param header - The DDS header containing metadata about the texture.
 * @param bitmap - The buffer containing the RGBA bitmap data to be encoded as DXT1.
 * @return A buffer containing the encoded DXT5 texture data.
 */
export default function writeDXT5Texture(
    header: DDSHeader,
    bitmap: Buffer): Buffer {

    // Check if the header is valid for DXT1 format
    if (header.pixelFormat.fourCharacterCode !== "DXT5")
        throw new Error("Invalid DXT1 format. Expected 'DXT5' four-character code.");

    // Allocate a buffer for the encoded texture data
    const {width, height} = header;
    const outputBuffer: Buffer = Buffer.alloc(
        Math.max(1, ((width + 3) >> 2)) *   // Right shift instead of divide by 4
        Math.max(1, ((height + 3) >> 2)) *  // Right shift instead of divide by 4
        BLOCK_SIZE
    );

    // Iterate over the texture blocks
    for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
            // Calculate the block index in the output buffer
            const blockIndex = BLOCK_SIZE * (
                Math.ceil(width / 4) *
                Math.floor(y / 4) +
                Math.floor(x / 4));
            const blockBuffer = outputBuffer.slice(blockIndex, blockIndex + BLOCK_SIZE);

            // Encode the 4x4 block from the bitmap into the output buffer
            encodeBlock(
                blockBuffer,
                bitmap,
                width,
                x,
                y
            );
        }
    }

    return outputBuffer;
}

/**
 * Encodes a 4x4 block of RGBA pixels into DXT1 format.
 * @param blockBuffer - The buffer to write the encoded block to.
 * @param bitmapBuffer - The RGBA bitmap data.
 * @param width - The width of the bitmap.
 * @param x - The x-coordinate of the block in the bitmap.
 * @param y - The y-coordinate of the block in the bitmap.
 */
function encodeBlock(
    blockBuffer: Buffer,
    bitmapBuffer: Buffer,
    width: number,
    x: number,
    y: number): void {

    // Initialize a 4x4 array to hold the colors of the pixels in the block
    const colors: number[][] = [];

    // Read the 4x4 block of pixels from the bitmap
    for (let yOffset = 0; yOffset < 4; yOffset++) {
        for (let xOffset = 0; xOffset < 4; xOffset++) {

            // Calculate the pixel index in the bitmap buffer
            const pixelIndex = ((y + yOffset) * width + (x + xOffset)) * 4;

            // Check out of bounds
            if (pixelIndex >= bitmapBuffer.length || pixelIndex < 0) {
                colors.push([0, 0, 0, 0]);
                continue;
            }

            // Read the RGBA values from the bitmap buffer
            colors.push([
                bitmapBuffer[pixelIndex],     // R
                bitmapBuffer[pixelIndex + 1], // G
                bitmapBuffer[pixelIndex + 2], // B
                bitmapBuffer[pixelIndex + 3]   // A
            ]);
        }
    }


    // Calculate min/max color
    const color0 = getMinColor(colors, false);
    let color0Encoded = encodeColor(color0);

    const color1 = getMaxColor(colors, false);
    let color1Encoded = encodeColor(color1);

    // Ensure color0 is always greater than (or equal to) color1
    if (color0Encoded < color1Encoded) {
        const temp = color0Encoded;
        color0Encoded = color1Encoded;
        color1Encoded = temp;
    }

    // Ensure alpha on color0 is always greater than (or equal to) alpha on color1
    if (color0[3] < color1[3]) {
        const temp = color0[3];
        color0[3] = color1[3];
        color1[3] = temp;
    }

    // Calculate the color indices for the 4x4 block
    const colorCodes: number[] = [];
    const alphaCodes: number[] = [];
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {

            // Calculate the pixel index in the 4x4 block
            const pixelColor = colors[j * 4 + i];
            const colorCode = calculateColorIndex(
                pixelColor,
                color0,
                color1,
                color0Encoded === color1Encoded,
                false);

            const alphaCode = calculateAlphaIndex(
                pixelColor,
                color0,
                color1,
                color0[3] === color1[3]);

            colorCodes.push(colorCode);
            alphaCodes.push(alphaCode);
            // alphaCodes.push(7);
        }
    }

    // Write the encoded alphas
    blockBuffer.writeUInt8(color0[3], 0);
    blockBuffer.writeUInt8(color1[3], 1);

    // Encode 16 3-bit alpha values into 6 bytes (Little Endian)
    const alphaBuffer = pack3BitValues(alphaCodes);
    for (let i = 0; i < 6; i++)
        blockBuffer.writeUInt8(alphaBuffer[i], 2 + i);

    // Write the encoded colors
    blockBuffer.writeUInt16LE(color0Encoded, 8);
    blockBuffer.writeUInt16LE(color1Encoded, 10);

    // Write the color indices as a 2 uint16 values
    let colorIndex = 0;
    for (let j = 0; j < 8; j++)
        colorIndex |= (colorCodes[j] << (2 * j));
    blockBuffer.writeUInt16LE(colorIndex & 0xFFFF, 12);

    colorIndex = 0;
    for (let j = 8; j < 16; j++)
        colorIndex |= (colorCodes[j] << (2 * (j - 8)));
    blockBuffer.writeUInt16LE(colorIndex & 0xFFFF, 14);
}

function pack3BitValues(values: number[]): Uint8Array {
    const buffer = new Uint8Array(6);
    let bitPos = 0;

    for (let i = 0; i < 16; i++) {
        const value = values[i];
        const byteIndex = Math.floor(bitPos / 8);
        const bitOffset = bitPos % 8;

        buffer[byteIndex] |= value << bitOffset;

        // Handle overflow into next byte
        if (bitOffset > 5)
            buffer[byteIndex + 1] |= value >> (8 - bitOffset);

        bitPos += 3;
    }

    return buffer;
}

/**
 * Encodes a color into a 16-bit value for DXT1.
 * @param color - The color to encode as an array [R, G, B].
 * @return The encoded 16-bit color value.
 */
function encodeColor(color: number[]): number {
    return ((color[0] & 0xF8) << 8) | // R: bits 11-15
        ((color[1] & 0xFC) << 3) |  // G: bits 5-10
        ((color[2] & 0xF8) >> 3);   // B: bits 0-4, shifted to fit in 8 bits
}

/**
 * Calculates the alpha index for a pixel based on its alpha value and the two endpoint colors.
 * @param pixelColor - The RGBA color of the pixel.
 * @param color0 - The first endpoint color.
 * @param color1 - The second endpoint color.
 * @param isEqual - Whether the two endpoint colors are equal.
 * @return The index of the alpha value in the DXT1 block (0-7)
 */
function calculateAlphaIndex(
    pixelColor: number[],
    color0: number[],
    color1: number[],
    isEqual: boolean): number {

    // If the two endpoint colors are equal, return 0 (the only color available)
    if (isEqual) return 0;

    // Get the alpha component of the pixel color
    const a = pixelColor[3];

    // Calculate the distance to each endpoint alpha
    const dist0 = Math.abs(a - color0[3]);
    const dist1 = Math.abs(a - color1[3]);

    const distPercent = dist0 / (dist0 + dist1);

    // Choose the alpha index based on the distances
    if (distPercent < 0.125) return 0;      // Closest to color0
    else if (distPercent < 0.25) return 2;
    else if (distPercent < 0.375) return 3;
    else if (distPercent < 0.5) return 4;
    else if (distPercent < 0.625) return 5;
    else if (distPercent < 0.75) return 6;
    else if (distPercent < 0.875) return 7;
    else return 1;                          // Closest to color1


}
