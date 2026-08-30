export interface DDSHeader {
    flags: DDSFlags;
    height: number;
    width: number;
    pitchOrLinearSize: number;
    depth: number;
    mipMapCount: number;

    pixelFormat: DDSPixelFormat;
    capabilities: CapabilityFlags;
}

export interface DDSFlags {
    capabilities: boolean;
    height: boolean;
    width: boolean;
    pitch: boolean;
    pixelFormat: boolean;
    mipMapCount: boolean;
    linearSize: boolean;
    depth: boolean;
}

export interface DDSPixelFormat {
    size: number;
    flags: PixelFormatFlags;
    fourCharacterCode: string;
    rgbBitCount: number;
    rBitMask: number;
    gBitMask: number;
    bBitMask: number;
    aBitMask: number;
}

export interface PixelFormatFlags {
    alphaPixels: boolean;
    alpha: boolean;
    fourCharacterCode: boolean;
    rgb: boolean;
    yuv: boolean;
    luminance: boolean;
}

export interface CapabilityFlags {

    // Caps1
    texture: boolean;
    mipMap: boolean;
    complex: boolean;

    // Caps2
    cubemap: boolean;
    cubemapPositiveX: boolean;
    cubemapNegativeX: boolean;
    cubemapPositiveY: boolean;
    cubemapNegativeY: boolean;
    cubemapPositiveZ: boolean;
    cubemapNegativeZ: boolean;
    volume: boolean;
}