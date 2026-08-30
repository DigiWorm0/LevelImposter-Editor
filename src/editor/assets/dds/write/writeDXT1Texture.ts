import {DDSHeader} from "@editor/assets/dds/DDSHeader";
import chooseEndpointColorsBruteforce from "./chooseEndpointColorsBruteforce";

const BLOCK_SIZE = 8;

/**
 * Writes a DXT1 texture to a buffer and returns the buffer.
 * @param header - The DDS header containing metadata about the texture.
 * @param bitmap - The buffer containing the RGBA bitmap data to be encoded as DXT1.
 * @return A buffer containing the encoded DXT1 texture data.
 */
export default function writeDXT1Texture(
    header: DDSHeader,
    bitmap: Uint8ClampedArray): Buffer {

    // Check if the header is valid for DXT1 format
    if (header.pixelFormat.fourCharacterCode !== "DXT1")
        throw new Error("Invalid DXT1 format. Expected 'DXT1' four-character code.");

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
                y,
                header.pixelFormat.flags.alphaPixels
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
 * @param enableAlpha - Enables alpha encoding if true, otherwise uses opaque encoding.
 */
function encodeBlock(
    blockBuffer: Buffer,
    bitmapBuffer: Uint8ClampedArray,
    width: number,
    x: number,
    y: number,
    enableAlpha: boolean): void {

    // Initialize a 4x4 array to hold the colors of the pixels in the block
    const colors = readBlockFromBitmap(bitmapBuffer, width, x, y);

    // Check if any pixel in the block is fully transparent
    const hasTransparentPixels = colors.some(color => color[3] === 0) && enableAlpha;

    // Calculate min/max color
    let {color0, color1} = chooseEndpointColorsBruteforce(colors, hasTransparentPixels);

    let color0Encoded = encodeColor(color0);
    let color1Encoded = encodeColor(color1);

    // If no transparency, ensure color0 is always greater than (or equal to) color1
    // If transparency is present, ensure color0 is always less than (or equal to) color1
    if (color0Encoded < color1Encoded && !hasTransparentPixels ||
        color0Encoded > color1Encoded && hasTransparentPixels) {

        // Swap encoded colors
        const temp = color0Encoded;
        color0Encoded = color1Encoded;
        color1Encoded = temp;

        // Swap actual colors
        const tempColor = color0;
        color0 = color1;
        color1 = tempColor;
    }

    // Calculate the color indices for the 4x4 block
    const colorCodes: number[] = [];
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {

            // Calculate the pixel index in the 4x4 block
            const pixelColor = colors[j * 4 + i];
            const colorCode = calculateColorIndex(
                pixelColor,
                color0,
                color1,
                color0Encoded === color1Encoded,
                hasTransparentPixels);

            colorCodes.push(colorCode);
        }
    }

    // Write the encoded colors
    blockBuffer.writeUInt16LE(color0Encoded, 0);
    blockBuffer.writeUInt16LE(color1Encoded, 2);

    // Write the color indices as a 2 uint16 values
    let colorIndex = 0;
    for (let j = 0; j < 8; j++)
        colorIndex |= (colorCodes[j] << (2 * j));
    blockBuffer.writeUInt16LE(colorIndex & 0xFFFF, 4);

    colorIndex = 0;
    for (let j = 8; j < 16; j++)
        colorIndex |= (colorCodes[j] << (2 * (j - 8)));
    blockBuffer.writeUInt16LE(colorIndex & 0xFFFF, 6);
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
 * Calculates the color index for a pixel based on its color and the two endpoint colors.
 * @param pixelColor - The RGBA color of the pixel.
 * @param color0 - The first endpoint color.
 * @param color1 - The second endpoint color.
 * @param isEqual - Whether the two endpoint colors are equal.
 * @param isTransparencyEnabled - Whether transparency is enabled.
 * @return The index of the color in the DXT1 block (0-3).
 */
export function calculateColorIndex(
    pixelColor: number[],
    color0: number[],
    color1: number[],
    isEqual: boolean,
    isTransparencyEnabled: boolean): number {

    // If transparency is enabled and the pixel is fully transparent, return 3
    if (isTransparencyEnabled && pixelColor[3] === 0) return 3;

    // If the two endpoint colors are equal, return 0 (the only color available)
    if (isEqual) return 0;

    // Calculate the distances to 2 colors
    const dist0 = getDistanceBetweenColors(pixelColor, color0);
    const dist1 = getDistanceBetweenColors(pixelColor, color1);

    if (isTransparencyEnabled) {
        // Calculate the distance to interpolated color (color2)
        const color2 = [
            Math.round((color0[0] + color1[0]) / 2),
            Math.round((color0[1] + color1[1]) / 2),
            Math.round((color0[2] + color1[2]) / 2)
        ];
        const dist2 = getDistanceBetweenColors(pixelColor, color2);

        // Determine which color is closest
        if (dist0 <= dist1 && dist0 <= dist2)
            return 0; // Closest to color0
        else if (dist1 <= dist0 && dist1 <= dist2)
            return 1; // Closest to color1
        else
            return 2; // Closest to color2
    } else {

        // Calculate the distance to two interpolated colors (color2 and color3)
        const color2 = [
            Math.round((2 * color0[0] + color1[0]) / 3),
            Math.round((2 * color0[1] + color1[1]) / 3),
            Math.round((2 * color0[2] + color1[2]) / 3)
        ];
        const dist2 = getDistanceBetweenColors(pixelColor, color2);

        const color3 = [
            Math.round((color0[0] + 2 * color1[0]) / 3),
            Math.round((color0[1] + 2 * color1[1]) / 3),
            Math.round((color0[2] + 2 * color1[2]) / 3)
        ];
        const dist3 = getDistanceBetweenColors(pixelColor, color3);


        // Determine which color is closest
        if (dist0 <= dist1 && dist0 <= dist2 && dist0 <= dist3)
            return 0; // Closest to color0
        else if (dist1 <= dist0 && dist1 <= dist2 && dist1 <= dist3)
            return 1; // Closest to color1
        else if (dist2 <= dist0 && dist2 <= dist1 && dist2 <= dist3)
            return 2; // Closest to color2
        else
            return 3; // Closest to color3
    }
}

/**
 * Calculates the distance between two colors in RGB space.
 * @param colorA - The first color as an array [R, G, B].
 * @param colorB - The second color as an array [R, G, B].
 * @return The distance between the two colors.
 */
export function getDistanceBetweenColors(colorA: number[], colorB: number[]): number {
    return Math.sqrt(
        Math.pow(colorA[0] - colorB[0], 2) +
        Math.pow(colorA[1] - colorB[1], 2) +
        Math.pow(colorA[2] - colorB[2], 2)
    );
}

/**
 * Reads a 4x4 block of pixels from a bitmap buffer.
 * @param bitmapBuffer - The buffer containing the RGBA bitmap data.
 * @param width - The width of the bitmap.
 * @param x - The x-coordinate of the block in the bitmap.
 * @param y - The y-coordinate of the block in the bitmap.
 */
export function readBlockFromBitmap(bitmapBuffer: Uint8ClampedArray, width: number, x: number, y: number): number[][] {
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
                bitmapBuffer[pixelIndex + 3]  // A
            ]);
        }
    }

    return colors;
}