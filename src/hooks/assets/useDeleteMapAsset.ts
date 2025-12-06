import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";
import {mapAssetsAtom} from "./useMapAssets";
import {mapAssetsAtomFamily} from "./useMapAsset";
import cleanupAsset from "../../utils/assets/cleanupAsset";

export const deleteMapAssetAtom = atom(null, (get, set, id: MaybeGUID) => {

    // Get asset
    const mapAsset = get(mapAssetsAtomFamily(id));
    if (!mapAsset)
        return;

    // Clean up Asset
    cleanupAsset(mapAsset);

    // Remove from map assets
    const mapAssets = get(mapAssetsAtom) || [];
    set(mapAssetsAtom, mapAssets.filter(asset => asset.id !== id));
});
deleteMapAssetAtom.debugLabel = "deleteMapAssetAtom";

export default function useDeleteMapAsset() {
    return useSetAtom(deleteMapAssetAtom);
}