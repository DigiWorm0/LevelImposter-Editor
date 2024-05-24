import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../../types/generic/GUID";
import { mapAssetsAtom } from "./useMapAssets";

// Map Asset Family
export const mapAssetsAtomFamily = atomFamily((id: MaybeGUID) => {
    const mapAssetAtom = atom(
        (get) => {
            const mapAssets = get(mapAssetsAtom) ?? [];
            return mapAssets.find((mapAsset) => mapAsset.id === id);
        },
        (get, set, newBlob: Blob) => {
            const mapAssets = get(mapAssetsAtom) ?? [];
            const index = mapAssets.findIndex((mapAsset) => mapAsset.id === id);
            if (index >= 0) {
                mapAssets[index].blob = newBlob;
                set(mapAssetsAtom, [...mapAssets]);
            }
        }
    );
    mapAssetAtom.debugLabel = `mapAssetsAtom(${id})`;
    return mapAssetAtom;
}, (a, b) => a === b);

// Hooks
export default function useMapAsset(id: MaybeGUID) {
    return useAtom(mapAssetsAtomFamily(id));
}

export function useSetMapAsset(id: MaybeGUID) {
    return useSetAtom(mapAssetsAtomFamily(id));
}

export function useMapAssetValue(id: MaybeGUID) {
    return useAtomValue(mapAssetsAtomFamily(id));
}