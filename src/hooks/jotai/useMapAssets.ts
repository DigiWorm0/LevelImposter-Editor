import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import React from "react";
import generateGUID from "../utils/generateGUID";
import MapAsset from "../../types/li/MapAssetDB";
import { focusAtom } from "jotai-optics";
import { mapAtom } from "./useMap";

// Map Asset List
//export const mapAssetsAtom = atomWithReset<MapAsset[]>([]);
//mapAssetsAtom.debugLabel = "mapAssetsAtom";

// Map Asset Family
export const mapAssetsAtom = focusAtom(mapAtom, (optic) => optic.prop("assets"));
export const mapAssetsAtomFamily = atomFamily((id: MaybeGUID) => {
    const mapAssetAtom = atom(
        (get) => {
            const mapAssets = get(mapAssetsAtom) ?? [];
            return mapAssets.find((mapAsset) => mapAsset.id === id);
        },
        (get, set, mapAsset: MapAsset) => {
            const mapAssets = get(mapAssetsAtom) ?? [];
            const index = mapAssets.findIndex((mapAsset) => mapAsset.id === id);
            if (index >= 0 && mapAsset) {
                mapAssets[index] = { ...mapAsset };
                set(mapAssetsAtom, [...mapAssets]);
            }
        }
    );
    mapAssetAtom.debugLabel = `mapAssetsAtom(${id})`;
    return mapAssetAtom;
}, (a, b) => a === b);

// Create Asset
export const addAssetAtom = atom(null, (get, set, asset: MapAsset) => {
    const mapAssets = get(mapAssetsAtom) ?? [];
    set(mapAssetsAtom, [...mapAssets, asset]);
});
addAssetAtom.debugLabel = "addAssetAtom";

// Remove Asset
export const removeAssetAtom = atom(null, (get, set, id: MaybeGUID) => {
    const mapAssets = get(mapAssetsAtom) ?? [];
    set(mapAssetsAtom, mapAssets.filter((mapAsset) => mapAsset.id !== id));
});
removeAssetAtom.debugLabel = "removeAssetAtom";

// Hooks
export default function useMapAsset(id: MaybeGUID) {
    return useAtom(mapAssetsAtomFamily(id));
}

export function useMapAssetValue(id: MaybeGUID) {
    return useAtomValue(mapAssetsAtomFamily(id));
}

export function useSetMapAsset(id: MaybeGUID) {
    return useSetAtom(mapAssetsAtomFamily(id));
}

export function useCreateMapAsset() {
    const addAsset = useSetAtom(addAssetAtom);
    return React.useCallback((blob: Blob) => {
        const asset: MapAsset = {
            id: generateGUID(),
            blob,
            url: URL.createObjectURL(blob),
        };
        addAsset(asset);
        return asset;
    }, [addAsset]);
}

export function useRemoveMapAsset() {
    return useSetAtom(removeAssetAtom);
}