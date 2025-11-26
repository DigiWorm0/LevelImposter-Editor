import {DDSHeader} from "../../../types/dds/DDSHeader";

/**
 * Creates a DDS header for a texture with the specified dimensions and format.
 * @param width - The width of the texture.
 * @param height - The height of the texture.
 * @param format - The format of the texture (default is "DXT1").
 * @return A DDSHeader object containing the header information.
 */
export default function createDDSHeader(width: number, height: number, format: string = "DXT1"): DDSHeader {
    const blockSize = format === "DXT1" ? 8 : 16;
    const linearSize = Math.max(1, ((width + 3) >> 2)) *   // Right shift instead of divide by 4
        Math.max(1, ((height + 3) >> 2)) *  // Right shift instead of divide by 4
        blockSize;

    return {
        flags: {
            capabilities: true,
            height: true,
            width: true,
            pitch: false,
            pixelFormat: true,
            mipMapCount: false,
            linearSize: false,
            depth: false,
        },
        height,
        width,
        pitchOrLinearSize: linearSize,
        depth: 0,
        mipMapCount: 0,

        pixelFormat: {
            size: 32,
            flags: {
                alphaPixels: true,
                alpha: false,
                fourCharacterCode: true,
                rgb: true,
                yuv: false,
                luminance: false
            },
            fourCharacterCode: format,
            rgbBitCount: 0,
            rBitMask: 0x00FF0000,
            gBitMask: 0x0000FF00,
            bBitMask: 0x000000FF,
            aBitMask: 0x00000000
        },
        capabilities: {
            texture: true,
            mipMap: false,
            complex: false,
            cubemap: false,
            cubemapPositiveX: false,
            cubemapNegativeX: false,
            cubemapPositiveY: false,
            cubemapNegativeY: false,
            cubemapPositiveZ: false,
            cubemapNegativeZ: false,
            volume: false
        }
    };
}