import {unwrap} from "jotai/utils";
import {useAtomValue} from "jotai";
import {MaybeGUID} from "@shared/types/GUID";
import {spriteAtomFamily} from "./useSprite";
import {elementAtomFamily} from "@editor/document/elements/useElement";
import {textureFromURLAtomFamily} from "@/rendering/canvas2/hooks/texture/useTextureFromURL";
import cachedAtomFamily from "@shared/atomics/cachedAtomFamily";

const UNKNOWN_SPRITE_URL = "/sprites/util-unknown.png";

export const elementSpriteAtomFamily = cachedAtomFamily(async (id: MaybeGUID, get) => {
    // Fallback to unknown sprite
    const unknownSprite = await get(textureFromURLAtomFamily(UNKNOWN_SPRITE_URL));

    // Get element
    const element = get(elementAtomFamily(id));
    if (!element)
        return unknownSprite;

    // Fallback to type sprite
    const defaultTypeSprite = await get(textureFromURLAtomFamily(`/sprites/${element.type}.png`));

    // Get element sprite
    const sprite = await get(spriteAtomFamily(element.properties.spriteID));
    if (!sprite)
        return defaultTypeSprite || unknownSprite;
    return sprite;
});

export default function useElementSprite(id: MaybeGUID) {
    return useAtomValue(unwrap(elementSpriteAtomFamily(id)));
}