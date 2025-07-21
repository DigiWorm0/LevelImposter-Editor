import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {mapAssetsAtom} from "./useMapAssets";

export const assetAtURLAtom = atomFamily((url: string) => {
    return atom((get) => {
        const assets = get(mapAssetsAtom);
        return assets?.find(a => a.url === url);
    });
});

export default function useAssetAtURL(url: string) {
    return useAtomValue(assetAtURLAtom(url));
}