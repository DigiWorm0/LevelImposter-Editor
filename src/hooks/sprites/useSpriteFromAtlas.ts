import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/common/GUID";
import {atom} from "jotai";
import {spriteAtlasAtomFamily} from "./useSpriteAtlas";
import {Rectangle, Texture} from "pixi.js";
import {textureAtomFamily} from "../texture/useTexture";
import {mapAssetsAtomFamily} from "../assets/useMapAsset";

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
        const mapAsset = get(mapAssetsAtomFamily(spriteID));
        const isDDS = mapAsset?.type === "image/dds";


        // Make sprite
        const {x, y, w, h} = spriteAtlas;
        const frame = new Rectangle(x, y, w, h);
        const texture = new Texture({
            source: baseTexture.source,
            frame,
        });

        // Flip the texture vertically if it's a DDS format (using UV coordinates)
        // TODO: Fix Me!
        if (isDDS) {
            // @ts-expect-error Manually editing texture UVs to fix DDS flipping issue
            texture.uvs = {
                x0: 0, y0: 1,
                x1: 1, y1: 1,
                x2: 1, y2: 0,
                x3: 0, y3: 0
            };
        }

        return texture;
    });
});