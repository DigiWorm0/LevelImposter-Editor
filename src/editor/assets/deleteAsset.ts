import {MaybeGUID} from "@/shared/types/GUID";
import {allAssetsAtom, MapAsset} from "./assetsStore";
import store from "../../shared/store";

export const deleteAsset = (assetID: MaybeGUID) => {
    const allAssets = store.get(allAssetsAtom);
    const asset = allAssets.find(asset => asset.id === assetID);
    if (!asset)
        return;

    // Clean up Asset
    cleanupAsset(asset);

    // Remove from map assets
    store.set(allAssetsAtom, allAssets.filter(asset => asset.id !== assetID));
};

/**
 * Cleans up resources associated with a map asset.
 * @param asset - The map asset to clean up.
 */
export const cleanupAsset = (asset: MapAsset) => {
    // Wait to release URL object(s)
    URL.revokeObjectURL(asset.url);
};