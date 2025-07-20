import {DDSHeader} from "../../../types/generic/DDSHeader";

export default function readDDSHeader(buffer: Buffer): DDSHeader {

    // Validate the buffer length
    if (buffer.length < 128)
        throw new Error("File is too short to contain a valid DDS header.");

    // Check if the file is a valid DDS file
    const magicNumber = buffer.toString("ascii", 0, 4);
    if (magicNumber !== "DDS ")
        throw new Error("File does not start with a valid DDS header.");

    // Check the header size
    const headerSize = buffer.readUInt32LE(4);
    if (headerSize !== 124)
        throw new Error(`Unexpected DDS header size: ${headerSize}. Expected 124.`);

    // Read flags
    const headerFlags = buffer.readUInt32LE(8);
    const pixelFormatFlags = buffer.readUInt32LE(80);
    const capsFlags = buffer.readUInt32LE(108);
    const caps2Flags = buffer.readUInt32LE(112);

    // Read the header fields
    return {
        flags: {
            capabilities: (headerFlags & 0x1) !== 0,
            height: (headerFlags & 0x2) !== 0,
            width: (headerFlags & 0x4) !== 0,
            pitch: (headerFlags & 0x8) !== 0,
            pixelFormat: (headerFlags & 0x1000) !== 0,
            mipMapCount: (headerFlags & 0x20000) !== 0,
            linearSize: (headerFlags & 0x80000) !== 0,
            depth: (headerFlags & 0x80000000) !== 0
        },
        height: buffer.readUInt32LE(12),
        width: buffer.readUInt32LE(16),
        pitchOrLinearSize: buffer.readUInt32LE(20),
        depth: buffer.readUInt32LE(24),
        mipMapCount: buffer.readUInt32LE(28),

        pixelFormat: {
            size: buffer.readUInt32LE(76),
            flags: {
                alphaPixels: (pixelFormatFlags & 0x1) !== 0,
                alpha: (pixelFormatFlags & 0x2) !== 0,
                fourCharacterCode: (pixelFormatFlags & 0x4) !== 0,
                rgb: (pixelFormatFlags & 0x40) !== 0,
                yuv: (pixelFormatFlags & 0x200) !== 0,
                luminance: (pixelFormatFlags & 0x20000) !== 0
            },
            fourCharacterCode: buffer.toString("ascii", 84, 88),
            rgbBitCount: buffer.readUInt32LE(88),
            rBitMask: buffer.readUInt32LE(92),
            gBitMask: buffer.readUInt32LE(96),
            bBitMask: buffer.readUInt32LE(100),
            aBitMask: buffer.readUInt32LE(104)
        },

        capabilities: {
            // Caps1
            complex: (capsFlags & 0x8) !== 0,
            texture: (capsFlags & 0x1000) !== 0,
            mipMap: (capsFlags & 0x400000) !== 0,

            // Caps2
            cubemap: (caps2Flags & 0x200) !== 0,
            cubemapPositiveX: (caps2Flags & 0x400) !== 0,
            cubemapNegativeX: (caps2Flags & 0x800) !== 0,
            cubemapPositiveY: (caps2Flags & 0x1000) !== 0,
            cubemapNegativeY: (caps2Flags & 0x2000) !== 0,
            cubemapPositiveZ: (caps2Flags & 0x4000) !== 0,
            cubemapNegativeZ: (caps2Flags & 0x8000) !== 0,
            volume: (caps2Flags & 0x200000) !== 0
        },
    };
}