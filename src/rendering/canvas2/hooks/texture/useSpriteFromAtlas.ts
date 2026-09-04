import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@shared/types/GUID";
import {atom} from "jotai";
import {spriteAtlasAtomFamily} from "./useSpriteAtlas";
import {Rectangle, Texture} from "pixi.js";
import {textureAtomFamily} from "@/rendering/canvas2/hooks/texture/useTexture";
import {assetsAtomFamily} from "@editor/assets/assetsStore";

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

        // Check if map asset is DDS
        const mapAsset = get(assetsAtomFamily(spriteAtlas.assetID));
        const isDDS = mapAsset?.type === "image/dds";

        // Make sprite
        const {x, y, w, h} = spriteAtlas;
        const frame = new Rectangle(x, y, w, h);
        const texture = new Texture({
            source: baseTexture.source,
            frame,
        });

        // Flip UVs for DDS textures so they display upside-down
        if (isDDS) {
            console.log("Flipping DDS texture UVs for sprite:", spriteID);
            const newUVs = {...texture.uvs};
            newUVs.y0 = texture.uvs.y3;
            newUVs.y1 = texture.uvs.y2;
            newUVs.y2 = texture.uvs.y1;
            newUVs.y3 = texture.uvs.y0;
            // @ts-expect-error Manually editing texture UVs to fix DDS flipping issue
            texture.uvs = newUVs;
        }

        return texture;
    });
});