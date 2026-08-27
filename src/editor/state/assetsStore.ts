import MapAsset from "../../types/li/MapAsset";
import {atom} from "jotai";
import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/types/common/GUID";

export const allAssetsAtom = atom<MapAsset[]>([]);

// Computed
export const assetsAtomFamily = atomFamily((id: MaybeGUID) => atom(get => {
    const allAssets = get(allAssetsAtom);
    return allAssets.find(asset => asset.id === id);
}));