import BuildOperation from "./BuildOperation";
import primaryStore from "../../hooks/primaryStore";
import BuildOperationLog from "./BuildOperationLog";
import {mapAssetsAtom} from "../../hooks/assets/useMapAssets";
import potpack, {PotpackStats} from "potpack";
import {createMapAssetAtom} from "../../hooks/assets/useCreateMapAsset";
import {Application, Sprite, Texture} from "pixi.js";
import MapAsset from "../../types/li/MapAsset";
import {textureFromURLAtomFamily} from "../../hooks/texture/useTextureFromURL";
import LISpriteAtlas from "../../types/li/LISpriteAtlas";
import generateGUID from "../strings/generateGUID";
import {replaceMapAssetIDAtom} from "../../hooks/assets/useReplaceMapAssetID";
import {spritesAtlasesAtom} from "../../hooks/map/useMap";


const CreateSpriteSheetOperation: BuildOperation = {
    async run() {
        // Get all image assets from the map
        const allMapAssets = primaryStore.get(mapAssetsAtom) || [];
        const imageAssets = allMapAssets
            .filter(asset => asset.type.startsWith("image/")) // <-- Exclude non-image assets (sounds, etc)
            .filter(asset => asset.type !== "image/gif"); // <-- Exclude GIFs

        if (!imageAssets || imageAssets.length === 0) {
            BuildOperationLog.info("No image assets to pack.");
            return;
        }
        if (imageAssets.length === 1) {
            BuildOperationLog.info("Only one image asset found; skipping packing.");
            return;
        }


        // Load PIXI texture for each image asset
        BuildOperationLog.info(`Loading ${imageAssets.length} textures into memory...`);

        const textures: PackableTexture[] = [];
        for (const asset of imageAssets || []) {
            const texture = await primaryStore.get(textureFromURLAtomFamily(asset.url));
            if (!texture) {
                BuildOperationLog.warn(`Failed to load texture for asset ID: ${asset.id}`);
                continue;
            }

            textures.push({
                w: texture.width,
                h: texture.height,
                x: 0, // <-- Assigned later by potpack
                y: 0, // <-- Assigned later by potpack
                texture,
                asset,
            });
        }

        // Calculate packing layout using potpack
        BuildOperationLog.info("Calculating optimal sprite packing layout (using potpack)...");
        const stats = potpack(textures);

        BuildOperationLog.info(`Found optimal layout: ${stats.w}x${stats.h} (${(stats.fill * 100).toFixed(2)}% filled)`);

        // Combine packed images into one image
        // TODO: Convert to DDS without losses due to compression
        BuildOperationLog.info("Combining sprites into a map asset...");
        const combinedImagePNGBlob = await combineMultipleTexturesToOne(stats, textures);
        const combinedImageAsset = primaryStore.set(createMapAssetAtom, {
            type: "image/png",
            blob: combinedImagePNGBlob,
        });

        // Create new Sprite Atlas
        BuildOperationLog.info("Creating sprite atlases and updating references...");
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
        const allSpriteAtlases = primaryStore.get(spritesAtlasesAtom) || [];
        primaryStore.set(spritesAtlasesAtom, [...allSpriteAtlases, ...spriteAtlases]);


        // Log result
        BuildOperationLog.success(`Combined ${spriteAtlases.length} images into 1 ${stats.w}x${stats.h} asset.`);
    }
};

export default CreateSpriteSheetOperation;

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

/**
 * Interface representing a texture that can be packed into a sprite sheet.
 */
interface PackableTexture {
    w: number;
    h: number;
    x: number;
    y: number;
    texture: Texture;
    asset: MapAsset;
}
