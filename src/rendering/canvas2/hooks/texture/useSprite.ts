import {atomFamily, unwrap} from "jotai/utils";
import {MaybeGUID} from "@shared/types/GUID";
import {atom, useAtomValue} from "jotai";
import {spriteFromAtlasAtomFamily} from "./useSpriteFromAtlas";
import {assetsAtomFamily} from "@editor/assets/assetsStore";
import {textureFromURLAtomFamily} from "@/rendering/canvas2/hooks/texture/useTextureFromURL";

export const spriteAtomFamily = atomFamily((spriteID: MaybeGUID) => {
    return atom(async (get) => {
        // Try to get sprite atlas
        const sprite = await get(spriteFromAtlasAtomFamily(spriteID));
        if (sprite)
            return sprite;

        // Fallback to map asset
        const asset = get(assetsAtomFamily(spriteID));
        if (!asset)
            return null;

        return await get(textureFromURLAtomFamily(asset.url));
    });
});

export default function useSprite(spriteID: MaybeGUID) {
    return useAtomValue(unwrap(spriteAtomFamily(spriteID)));
}