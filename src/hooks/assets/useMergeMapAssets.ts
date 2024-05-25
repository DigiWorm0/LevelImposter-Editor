// Trim Assets
import { atom } from "jotai/index";
import { mapAssetsAtom } from "./useMapAssets";
import { useSetAtom } from "jotai";
import MapAsset from "../../types/li/MapAsset";
import compareBlobs from "../../types/compareBlobs";
import { deleteMapAssetAtom } from "./useDeleteMapAsset";
import { saveHistoryAtom } from "../map/history/useHistory";

// Atom
export const mergeAssetsAtom = atom(null, (get, set) => {

    // Get Assets
    const assets = get(mapAssetsAtom);
    if (!assets)
        return;

    // Iterate Assets
    const checkedAssets: MapAsset[] = [];
    assets.forEach((asset) => {

        // Check for Existing
        const existingAsset = checkedAssets.find(other => compareBlobs(other.blob, asset.blob));
        if (!existingAsset) {
            checkedAssets.push(asset);
            return;
        }

        // Duplicate Found
        console.log(`Duplicate asset found: ${asset.id} -> ${existingAsset.id}`);
        // TODO: Update Elements to use existingAsset.id
        set(deleteMapAssetAtom, asset.id);
    });

    set(saveHistoryAtom);
});
mergeAssetsAtom.debugLabel = "mergeAssetsAtom";

// Hooks
export default function useMergeMapAssets() {
    return useSetAtom(mergeAssetsAtom);
}