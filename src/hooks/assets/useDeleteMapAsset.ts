import { atom, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { mapAssetsAtom } from "./useMapAssets";
import { replaceMapAssetIDAtom } from "./useReplaceMapAssetID";
import { saveHistoryAtom } from "../map/history/useHistory";

export const deleteMapAssetAtom = atom(null, (get, set, id: MaybeGUID) => {
    const mapAssets = [...(get(mapAssetsAtom) ?? [])];
    const index = mapAssets.findIndex((mapAsset) => mapAsset.id === id);
    if (index >= 0) {
        mapAssets.splice(index, 1);
        set(mapAssetsAtom, mapAssets);
    }

    const referenceCount = set(replaceMapAssetIDAtom, { fromID: id, toID: undefined });
    set(saveHistoryAtom);
    return referenceCount;
});
deleteMapAssetAtom.debugLabel = "deleteMapAssetAtom";

export default function useDeleteMapAsset() {
    return useSetAtom(deleteMapAssetAtom);
}