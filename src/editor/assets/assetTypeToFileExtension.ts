const ASSET_TYPE_TO_EXTENSION: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/dds": "dds",
    "audio/wav": "wav"
};

/**
 * Gets the file extension for a given asset type.
 * @param assetType - The MIME type of the asset.
 * @return The file extension associated with the asset type, or "bin" if unknown.
 */
export default function assetTypeToFileExtension(assetType: string): string {
    // Return the file extension for the given asset type
    return ASSET_TYPE_TO_EXTENSION[assetType] || "bin";
}