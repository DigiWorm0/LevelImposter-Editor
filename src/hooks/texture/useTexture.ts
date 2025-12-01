import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";
import {mapAssetsAtomFamily} from "../assets/useMapAsset";
import {textureFromURLAtomFamily} from "./useTextureFromURL";

export const textureAtomFamily = atomFamily((assetID: MaybeGUID) => {
    return atom(async (get) => {
        // Get map asset
        const mapAsset = get(mapAssetsAtomFamily(assetID));
        if (!mapAsset || !mapAsset.url)
            return null;

        // Load texture from URL
        return await get(textureFromURLAtomFamily(mapAsset.url));
    });
});

export default function useTexture(assetID: MaybeGUID) {
    return useAtomValue(unwrap(textureAtomFamily(assetID)));
}