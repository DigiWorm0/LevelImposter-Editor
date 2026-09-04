interface MagicNumber {

    // The prefix to match against the asset's binary content
    signature: string;

    // The offset in the binary content where the prefix starts
    offset: number;

    // The MIME type to return if the prefix matches
    matchType: string;
}

const MAGIC_NUMBERS: MagicNumber[] = [
    {signature: "GIF87a", offset: 0, matchType: "image/gif"},
    {signature: "GIF89a", offset: 0, matchType: "image/gif"},

    {signature: "PNG", offset: 1, matchType: "image/png"},

    {signature: "JFIF", offset: 6, matchType: "image/jpeg"},
    {signature: "Exif", offset: 6, matchType: "image/jpeg"},

    {signature: "DDS ", offset: 0, matchType: "image/dds"},
    {signature: "RIFF", offset: 0, matchType: "audio/wav"}
];

/**
 * Parses the type of asset based on its binary content.
 * @param assetData - The asset as an ArrayBuffer.
 * @return The MIME type of the asset as a string.
 */
export default function parseAssetType(assetData: ArrayBuffer) {
    const textDecoder = new TextDecoder();

    // Iterate through the magic numbers to find a match
    for (const magic of MAGIC_NUMBERS) {
        const slice = assetData.slice(magic.offset, magic.offset + magic.signature.length);
        const decodedSlice = textDecoder.decode(slice);
        if (decodedSlice === magic.signature)
            return magic.matchType;
    }

    console.warn("Unknown asset strings", textDecoder.decode(assetData.slice(0, 20)));

    return "application/octet-stream";
}