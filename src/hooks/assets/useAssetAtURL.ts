import {atom} from "jotai";
import {atomFamily} from "jotai/utils";
import {allAssetsAtom} from "@editor/assets/assetsStore";

export const assetAtURLAtom = atomFamily((url: string) => atom((get) => {
    const assets = get(allAssetsAtom);
    return assets?.find(asset => asset.url === url);
}));