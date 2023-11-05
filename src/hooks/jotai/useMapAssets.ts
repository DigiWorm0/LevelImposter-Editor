import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import React from "react";
import generateGUID from "../utils/generateGUID";
import MapAsset from "../../types/li/MapAssetDB";
import { focusAtom } from "jotai-optics";
import { elementsAtom, mapAtom } from "./useMap";

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

// Trim Assets
export const trimAssetsAtom = atom(null, (get, set) => {
    const elements = get(elementsAtom);

    // Get All Used Asset IDs
    const spriteIDs = elements.map((e) => e.properties.spriteID);
    const minigameIDs = elements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
    const soundIDs = elements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();
    const assetIDs = [...spriteIDs, ...minigameIDs, ...soundIDs];

    // Remove Unused Assets
    const mapAssets = get(mapAssetsAtom) ?? [];
    const filteredAssets = mapAssets.filter((a) => assetIDs.includes(a.id));

    // Update Atom
    if (filteredAssets.length !== mapAssets.length) {
        console.log(`Trimmed ${mapAssets.length - filteredAssets.length} assets`);
        set(mapAssetsAtom, filteredAssets);
    }
});
trimAssetsAtom.debugLabel = "trimAssetsAtom";

// Hooks
export default function useMapAssetsValue() {
    return useAtomValue(mapAssetsAtom);
}

export function useMapAssetValue(id: MaybeGUID) {
    return useAtomValue(mapAssetsAtomFamily(id));
}

export function useTrimAssets() {
    return useSetAtom(trimAssetsAtom);
}

export function useCreateMapAsset() {
    const addAsset = useSetAtom(addAssetAtom);
    const trimAssets = useTrimAssets();

    return React.useCallback((blob: Blob) => {
        const asset: MapAsset = {
            id: generateGUID(),
            blob,
            url: URL.createObjectURL(blob),
        };
        trimAssets();
        addAsset(asset);
        return asset;
    }, [addAsset]);
}
