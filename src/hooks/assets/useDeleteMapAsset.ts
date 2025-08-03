import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";
import {mapAssetsAtom} from "./useMapAssets";
import {replaceMapAssetIDAtom} from "./useReplaceMapAssetID";

export const deleteMapAssetAtom = atom(null, (get, set, id: MaybeGUID) => {
    const mapAssets = [...(get(mapAssetsAtom) ?? [])];
    const index = mapAssets.findIndex((mapAsset) => mapAsset.id === id);
    if (index >= 0) {
        mapAssets.splice(index, 1);
        set(mapAssetsAtom, mapAssets);
    }

    return set(replaceMapAssetIDAtom, {fromID: id, toID: undefined});
});
deleteMapAssetAtom.debugLabel = "deleteMapAssetAtom";

export default function useDeleteMapAsset() {
    return useSetAtom(deleteMapAssetAtom);
}