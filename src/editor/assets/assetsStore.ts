import {atom} from "jotai";
import GUID, {MaybeGUID} from "@/shared/types/GUID";
import cachedAtomFamily from "@shared/atomics/cachedAtomFamily";

export interface MapAsset {
    id: GUID;
    type: string;
    url: string;
    blob: Blob;
}

export const allAssetsAtom = atom<MapAsset[]>([]);

// Computed
export const assetsAtomFamily = cachedAtomFamily((id: MaybeGUID, get) => {
    const allAssets = get(allAssetsAtom);
    return allAssets.find(asset => asset.id === id);
});