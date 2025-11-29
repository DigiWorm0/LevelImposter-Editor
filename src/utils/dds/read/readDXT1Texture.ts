import {DDSHeader} from "../../../types/dds/DDSHeader";

const BLOCK_SIZE = 8;

export interface Color {
    // 16-bit color value
    encodedValue: number;

    // Decoded RGBA color components
    rgba: number[];
}

/**
 * Reads a DXT1 texture from a buffer and returns a bitmap buffer.
 * @param header - The DDS header containing metadata about the texture.
 * @param buffer - The buffer containing the DXT1 texture data.
 * @return A buffer containing the decoded texture data as an RGBA bitmap.
 */
export default function readDXT1Texture(header: DDSHeader, buffer: Buffer): Buffer {

    // Check if the header is valid for DXT1 format
    if (header.pixelFormat.fourCharacterCode !== "DXT1")
        throw new Error("Invalid DXT1 format. Expected 'DXT1' four-character code.");

    // Allocate a buffer for the decoded texture data
    const {width, height} = header;
    const outputBuffer: Buffer = Buffer.alloc(width * height * 4); // 4 bytes for RGBA

    // Iterate over the texture blocks
    for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
            // Slice the block from the buffer
            const blockIndex = BLOCK_SIZE * (
                Math.ceil(width / 4) *
                Math.floor(y / 4) +
                Math.floor(x / 4));
            const blockBuffer = buffer.slice(blockIndex, blockIndex + BLOCK_SIZE);

            // Fill the 4x4 block in the output buffer with the decoded colors
            fillBlock(
                outputBuffer,
                blockBuffer,
                header.width,
                x,
                y,
                header.pixelFormat.flags.alphaPixels
            );
        }
    }

    return outputBuffer;
}

/**
 * Linearly interpolates between two colors based on their weights.
 * @param color0 - The first color to interpolate from.
 * @param color0Weight - The weight of the first color.
 * @param color1 - The second color to interpolate to.
 * @param color1Weight - The weight of the second color.
 */
function lerpColor(color0: Color, color0Weight: number, color1: Color, color1Weight: number): Color {
    const rgba = [0, 0, 0, 255];

    // Iterate over the RGB components (0-2)
    for (let i = 0; i < 3; i++) {

        // Average the RGB components based on their weights
        rgba[i] = Math.round((
            color0.rgba[i] * color0Weight +
            color1.rgba[i] * color1Weight
        ) / (color0Weight + color1Weight));
    }

    return {encodedValue: 0, rgba};
}

/**
 * Converts a color code to a color based on the two base colors.
 * @param colorCode - The color code (0-3) to convert.
 * @param color0 - The first decoded color (16-bit uint).
 * @param color1 - The second decoded color (16-bit uint).
 * @param enableAlpha - Whether to enable alpha transparency in the output color.
 * @return The corresponding color value based on the color code
 */
function codeToColor(
    colorCode: number,
    color0: Color,
    color1: Color,
    enableAlpha?: boolean): Color {
    if (color0.encodedValue > color1.encodedValue) {
        switch (colorCode) {
            case 0:
                return color0;
            case 1:
                return color1;
            case 2:
                return lerpColor(color0, 2, color1, 1);
            case 3:
                return lerpColor(color0, 1, color1, 2);
        }
    } else {
        switch (colorCode) {
            case 0:
                return color0;
            case 1:
                return color1;
            case 2:
                return lerpColor(color0, 1, color1, 1);
            case 3:
                return {encodedValue: 0, rgba: [0, 0, 0, enableAlpha ? 0 : 255]};
        }
    }

    throw new Error(`Invalid color code: ${colorCode}. Expected 0-3.`);
}

/**
 * Decodes an uint16 color value into a color object.
 * @param color - The uint16 color value to decode.
 * @return An array containing the RGBA color components.
 */
function decodeColor(color: number): Color {
    // Extract RGB components from the 16-bit color value
    const r = (color & 0xF800) >> 8; // Bits 11-15
    const g = (color & 0x07E0) >> 3; // Bits 5-10
    const b = (color & 0x001F) << 3; // Bits 0-4, shifted to fit in 8 bits

    // Convert to RGBA format (8 bits per channel)
    return {
        encodedValue: color,
        rgba: [r, g, b, 255] // Alpha is set to 255 (opaque)
    };
}

/**
 * Fills a 4x4 block of pixels in the output buffer with the decoded colors.
 * @param bitmapBuffer - The buffer to fill with pixel data.
 * @param blockBuffer - The buffer containing the DXT1 block data.
 * @param width - The width of the texture.
 * @param x - The x-coordinate of the block.
 * @param y - The y-coordinate of the block.
 * @param enableAlpha - Whether to enable alpha transparency in the output color.
 */

function fillBlock(
    bitmapBuffer: Buffer,
    blockBuffer: Buffer,
    width: number,
    x: number,
    y: number,
    enableAlpha?: boolean
): void {
    // Read the two colors from the block
    const color0 = decodeColor(blockBuffer.readUInt16LE(0));
    const color1 = decodeColor(blockBuffer.readUInt16LE(2));

    // Read the bits that define the color codes for the 4x4 block
    const bits = blockBuffer.readUInt32LE(4);

    // Iterate over the 4x4 block of pixels
    for (let xOffset = 0; xOffset < 4; xOffset++) {
        for (let yOffset = 0; yOffset < 4; yOffset++) {

            // Get the color code for the current pixel
            const colorCode = (bits >> (2 * (yOffset * 4 + xOffset))) & 0x03;

            // Calculate the color from the color code
            const color = codeToColor(colorCode, color0, color1, enableAlpha);

            // Write the RGBA values to the output buffer
            const pixelIndex = (y + yOffset) * width + (x + xOffset);
            const outputIndex = pixelIndex * 4; // 4 bytes per pixel (RGBA)
            for (let i = 0; i < 4; i++)
                bitmapBuffer[outputIndex + i] = color.rgba[i];
        }
    }
}