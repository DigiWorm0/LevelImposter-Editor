import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/common/GUID";
import {atom} from "jotai";
import {spriteAtlasAtomFamily} from "./useSpriteAtlas";
import {Rectangle, Texture} from "pixi.js";
import {textureAtomFamily} from "../texture/useTexture";

export const spriteFromAtlasAtomFamily = atomFamily((spriteID: MaybeGUID) => {
    return atom(async (get) => {
        // Try to get sprite atlas
        const spriteAtlas = get(spriteAtlasAtomFamily(spriteID));
        if (!spriteAtlas)
            return null;

        // Get base texture
        const baseTexture = await get(textureAtomFamily(spriteAtlas.assetID));
        if (!baseTexture)
            return null;

        // Make sprite
        const {x, y, w, h} = spriteAtlas;
        const frame = new Rectangle(x, y, w, h);
        return new Texture({
            source: baseTexture.source,
            frame
        });
    });
});