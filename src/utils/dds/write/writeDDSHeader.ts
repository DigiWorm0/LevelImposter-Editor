import {DDSHeader} from "../../../types/dds/DDSHeader";

/**
 * Writes a DDS header to a Buffer.
 * @param header - The DDS header to write.
 * @return A Buffer containing the DDS header.
 */
export default function writeDDSHeader(header: DDSHeader): Buffer {

    // Create a buffer of 128 bytes
    const buffer = Buffer.alloc(128);
    buffer.fill(0);

    // Write the magic number
    buffer.write("DDS ", 0, "ascii");

    // Write the header size
    buffer.writeUInt32LE(124, 4);

    // Write flags
    let flags = 0;
    if (header.flags.capabilities) flags |= 0x1;
    if (header.flags.height) flags |= 0x2;
    if (header.flags.width) flags |= 0x4;
    if (header.flags.pitch) flags |= 0x8;
    if (header.flags.pixelFormat) flags |= 0x1000;
    if (header.flags.mipMapCount) flags |= 0x20000;
    if (header.flags.linearSize) flags |= 0x80000;
    if (header.flags.depth) flags |= 0x80000000;

    buffer.writeUInt32LE(flags, 8);

    // Write height and width
    buffer.writeUInt32LE(header.height, 12);
    buffer.writeUInt32LE(header.width, 16);

    // Write pitch or linear size
    buffer.writeUInt32LE(header.pitchOrLinearSize, 20);

    // Write depth and mip map count
    buffer.writeUInt32LE(header.depth, 24);
    buffer.writeUInt32LE(header.mipMapCount, 28);

    // Write pixel format
    buffer.writeUInt32LE(header.pixelFormat.size, 76);

    let pixelFormatFlags = 0;
    if (header.pixelFormat.flags.alphaPixels) pixelFormatFlags |= 0x1;
    if (header.pixelFormat.flags.alpha) pixelFormatFlags |= 0x2;
    if (header.pixelFormat.flags.fourCharacterCode) pixelFormatFlags |= 0x4;
    if (header.pixelFormat.flags.rgb) pixelFormatFlags |= 0x40;
    if (header.pixelFormat.flags.yuv) pixelFormatFlags |= 0x200;
    if (header.pixelFormat.flags.luminance) pixelFormatFlags |= 0x20000;

    buffer.writeUInt32LE(pixelFormatFlags, 80);

    // Write four character code and bit masks
    if (header.pixelFormat.fourCharacterCode.length !== 4)
        throw new Error("Four character code must be exactly 4 characters long.");
    buffer.write(header.pixelFormat.fourCharacterCode, 84, "ascii");

    buffer.writeUInt32LE(header.pixelFormat.rgbBitCount, 88);
    buffer.writeUInt32LE(header.pixelFormat.rBitMask, 92);
    buffer.writeUInt32LE(header.pixelFormat.gBitMask, 96);
    buffer.writeUInt32LE(header.pixelFormat.bBitMask, 100);
    buffer.writeUInt32LE(header.pixelFormat.aBitMask, 104);

    // Write caps flags
    let capsFlags = 0;
    if (header.capabilities.texture) capsFlags |= 0x1000;
    if (header.capabilities.complex) capsFlags |= 0x8;
    if (header.capabilities.mipMap) capsFlags |= 0x400000;
    buffer.writeUInt32LE(capsFlags, 108);

    // Write caps2 flags
    let caps2Flags = 0;
    if (header.capabilities.cubemap) caps2Flags |= 0x200;
    if (header.capabilities.cubemapPositiveX) caps2Flags |= 0x400;
    if (header.capabilities.cubemapNegativeX) caps2Flags |= 0x800;
    if (header.capabilities.cubemapPositiveY) caps2Flags |= 0x1000;
    if (header.capabilities.cubemapNegativeY) caps2Flags |= 0x2000;
    if (header.capabilities.cubemapPositiveZ) caps2Flags |= 0x4000;
    if (header.capabilities.cubemapNegativeZ) caps2Flags |= 0x8000;
    if (header.capabilities.volume) caps2Flags |= 0x200000;
    buffer.writeUInt32LE(caps2Flags, 112);

    return buffer;
}