import {atom} from "jotai";
import {atomFamily} from "jotai/utils";
import GUID, {MaybeGUID} from "@/shared/types/GUID";

export interface MapAsset {
    id: GUID;
    type: string;
    url: string;
    blob: Blob;
}

export const allAssetsAtom = atom<MapAsset[]>([]);

// Computed
export const assetsAtomFamily = atomFamily((id: MaybeGUID) => atom(get => {
    const allAssets = get(allAssetsAtom);
    return allAssets.find(asset => asset.id === id);
}));