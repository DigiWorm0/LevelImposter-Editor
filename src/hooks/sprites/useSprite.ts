import {atomFamily, unwrap} from "jotai/utils";
import {MaybeGUID} from "../../types/common/GUID";
import {atom, useAtomValue} from "jotai";
import {mapAssetsAtomFamily} from "../assets/useMapAsset";
import {spriteFromAtlasAtomFamily} from "./useSpriteFromAtlas";
import {textureFromURLAtomFamily} from "../texture/useTextureFromURL";

export const spriteAtomFamily = atomFamily((spriteID: MaybeGUID) => {
    return atom(async (get) => {
        // Try to get sprite atlas
        const sprite = await get(spriteFromAtlasAtomFamily(spriteID));
        if (sprite)
            return sprite;

        // Fallback to map asset
        const mapAsset = get(mapAssetsAtomFamily(spriteID));
        if (!mapAsset)
            return null;

        return await get(textureFromURLAtomFamily(mapAsset.url));
    });
});

export default function useSprite(spriteID: MaybeGUID) {
    return useAtomValue(unwrap(spriteAtomFamily(spriteID)));
}