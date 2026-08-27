import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {MaybeGUID} from "@/types/common/GUID";
import {textureFromURLAtomFamily} from "./useTextureFromURL";
import {assetsAtomFamily} from "@editor/state/assetsStore";

export const textureAtomFamily = atomFamily((assetID: MaybeGUID) => {
    return atom(async (get) => {
        // Get map asset
        const asset = get(assetsAtomFamily(assetID));
        if (!asset || !asset.url)
            return null;

        // Load texture from URL
        return await get(textureFromURLAtomFamily(asset.url));
    });
});

export default function useTexture(assetID: MaybeGUID) {
    return useAtomValue(unwrap(textureAtomFamily(assetID)));
}