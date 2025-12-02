import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/common/GUID";
import {mapAssetsAtom} from "./useMapAssets";

// Map Asset Family
export const mapAssetsAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const mapAssets = get(mapAssetsAtom) ?? [];
        return mapAssets.find((mapAsset) => mapAsset.id === id);
    });
});

// Hooks
export default function useMapAsset(id: MaybeGUID) {
    return useAtomValue(mapAssetsAtomFamily(id));
}