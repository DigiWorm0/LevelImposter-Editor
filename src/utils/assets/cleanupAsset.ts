import MapAsset from "../../types/li/MapAsset";

/**
 * Cleans up resources associated with a map asset.
 * @param asset - The map asset to clean up.
 */
export default function cleanupAsset(asset: MapAsset) {
    // Wait to release URL object(s)
    URL.revokeObjectURL(asset.url);
}