import {DDSHeader} from "../../../types/dds/DDSHeader";

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
    const color0 = getMinColor(colors, hasTransparentPixels);
    let color0Encoded = encodeColor(color0);

    const color1 = getMaxColor(colors, hasTransparentPixels);
    let color1Encoded = encodeColor(color1);

    // If no transparency, ensure color0 is always greater than (or equal to) color1
    // If transparency is present, ensure color0 is always less than (or equal to) color1
    if (color0Encoded < color1Encoded && !hasTransparentPixels ||
        color0Encoded > color1Encoded && hasTransparentPixels) {
        const temp = color0Encoded;
        color0Encoded = color1Encoded;
        color1Encoded = temp;
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

    // Get the RGB components of the pixel color
    const r = pixelColor[0];
    const g = pixelColor[1];
    const b = pixelColor[2];

    // Calculate the distance to each endpoint color
    const dist0 = Math.sqrt(
        Math.pow(r - color0[0], 2) +
        Math.pow(g - color0[1], 2) +
        Math.pow(b - color0[2], 2));

    const dist1 = Math.sqrt(
        Math.pow(r - color1[0], 2) +
        Math.pow(g - color1[1], 2) +
        Math.pow(b - color1[2], 2));

    // return dist0 < dist1 ? 0 : 1; // Return 0 if closer to color0, otherwise return 1

    const distPercent = dist0 / (dist0 + dist1);

    // Choose the color index based on the distances
    if (isTransparencyEnabled) {
        if (distPercent < 0.33) return 0;       // Closest to color0
        else if (distPercent > 0.66) return 1;  // Closer to color1
        else return 2;                          // Between color0 and color1
    } else {
        if (distPercent < 0.2) return 1;        // Closest to color0
        else if (distPercent > 0.8) return 0;   // Closer to color1
        else if (distPercent < 0.5) return 3;   // Between color0 and color1, closer to color0
        else return 2;                           // Between color0 and color1, closer to color1
    }
}

/**
 * Gets the minimum color from an array of colors.
 * Selects the minimum value for each RGBA channel across all colors.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @param skipTransparentColors - If true, skips fully transparent colors when calculating the minimum.
 * @return An array representing the minimum color [R, G, B, A].
 */
export function getMinColor(colors: number[][], skipTransparentColors: boolean): number[] {
    // Initialize a color array with maximum values
    const minColor = [255, 255, 255, 255];

    // Iterate through the colors to find the minimum
    for (const color of colors) {
        // Skip fully transparent colors if specified
        if (skipTransparentColors && color[3] === 0)
            continue;

        minColor[0] = Math.min(minColor[0], color[0]);
        minColor[1] = Math.min(minColor[1], color[1]);
        minColor[2] = Math.min(minColor[2], color[2]);
        minColor[3] = Math.min(minColor[3], color[3]);
    }

    return minColor;
}

/**
 * Gets the maximum color from an array of colors.
 * Selects the maximum value for each RGBA channel across all colors.
 * @param colors - An array of colors, each represented as an array of RGBA values.
 * @param skipTransparentColors - If true, skips fully transparent colors when calculating the maximum.
 * @return An array representing the maximum color [R, G, B, A].
 */
export function getMaxColor(colors: number[][], skipTransparentColors: boolean): number[] {
    // Initialize a color array with minimum values
    const maxColor = [0, 0, 0, 0];

    // Iterate through the colors to find the maximum
    for (const color of colors) {
        // Skip fully transparent colors if specified
        if (skipTransparentColors && color[3] === 0)
            continue;

        maxColor[0] = Math.max(maxColor[0], color[0]);
        maxColor[1] = Math.max(maxColor[1], color[1]);
        maxColor[2] = Math.max(maxColor[2], color[2]);
        maxColor[3] = Math.max(maxColor[3], color[3]);
    }

    return maxColor;
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