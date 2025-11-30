import primaryStore from "../../hooks/primaryStore";
import {mapAssetsAtom} from "../../hooks/assets/useMapAssets";
import {spriteAtomFamily} from "../../hooks/canvas/sprite/useSprite";
import {Application, Sprite, Texture} from "pixi.js";
import potpack, {PotpackStats} from "potpack";
import generateGUID from "../../utils/strings/generateGUID";
import {createMapAssetAtom} from "../../hooks/assets/useCreateMapAsset";
import LISpriteAtlas from "../li/LISpriteAtlas";
import MapAsset from "../li/MapAsset";
import {replaceMapAssetIDAtom} from "../../hooks/assets/useReplaceMapAssetID";
import {spritesAtom} from "../../hooks/map/useMap";

interface PackableTexture {
    w: number;
    h: number;
    x: number;
    y: number;
    texture: Texture;
    asset: MapAsset;
}

/**
 * Packs all image assets used in the map into a single texture atlas.
 * Updates references to use the new atlas and creates a new map asset for it.
 */
export default async function packMapAssetsTogether() {

    // Get all image assets from the map
    const allMapAssets = primaryStore.get(mapAssetsAtom);
    const imageAssets = allMapAssets?.filter(asset => asset.type.startsWith("image/"));

    // Load PIXI texture for each image asset
    // TODO: Disassemble existing sprites into individual textures
    const textures: PackableTexture[] = [];
    for (const asset of imageAssets || []) {
        const texture = await primaryStore.get(spriteAtomFamily(asset.url));
        if (!texture)
            continue;

        textures.push({
            w: texture.width,
            h: texture.height,
            x: 0,
            y: 0,
            texture,
            asset,
        });
    }

    // Calculate packing layout using potpack
    const stats = potpack(textures);

    // Combine packed images into one image
    const combinedImagePNGBlob = await combineMultipleTexturesToOne(stats, textures);

    // TODO: Convert to DDS without losses due to compression

    // Create Map Asset
    const combinedImageAsset = primaryStore.set(createMapAssetAtom, {
        type: "image/png",
        blob: combinedImagePNGBlob,
    });

    // Create new Sprite Atlas
    const spriteAtlases: LISpriteAtlas[] = [];
    for (const textureInfo of textures) {

        // Add texture to atlas
        const atlas: LISpriteAtlas = {
            id: generateGUID(),
            assetID: combinedImageAsset.id,
            x: textureInfo.x,
            y: textureInfo.y,
            w: textureInfo.w,
            h: textureInfo.h,
        };
        spriteAtlases.push(atlas);

        // Change all references from map asset to sprite atlas
        // Warning: This could cause non-image references to be swapped if IDs clash
        primaryStore.set(replaceMapAssetIDAtom, {
            fromID: textureInfo.asset.id,
            toID: atlas.id
        });
    }

    // Add new sprite atlases to store
    const sprites = primaryStore.get(spritesAtom) || [];
    primaryStore.set(spritesAtom, [...sprites, ...spriteAtlases]);
}

/**
 * Combines multiple textures into one texture based on provided stats and positions.
 * @param stats - PotpackStats containing width and height of the combined texture
 * @param sprites - Array of PackableTexture with individual textures and their positions
 * @returns A Promise that resolves to a Blob of the combined texture image (PNG format)
 */
async function combineMultipleTexturesToOne(stats: PotpackStats, sprites: PackableTexture[]): Promise<Blob> {
    const pixiApp = new Application();
    await pixiApp.init({
        width: stats.w,
        height: stats.h,
        backgroundAlpha: 0,
        preserveDrawingBuffer: true,
    });

    for (const sprite of sprites) {
        const pixiSprite = new Sprite(sprite.texture);
        pixiSprite.x = sprite.x;
        pixiSprite.y = sprite.y;
        pixiApp.stage.addChild(pixiSprite);
    }

    const canvas = pixiApp.renderer.extract.canvas(pixiApp.stage);
    return new Promise<Blob>((resolve) => {
        if (!canvas.toBlob)
            throw new Error("Canvas toBlob is not supported");

        canvas.toBlob((blob) => {
            if (blob)
                resolve(blob);
        });
    });
}