import {atomFamily} from "jotai/utils";
import {atom} from "jotai";
import {MaybeGUID} from "@/shared/types/GUID";
import {textureFromURLAtomFamily} from "./useTextureFromURL";
import {assetsAtomFamily} from "@editor/assets/assetsStore";

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