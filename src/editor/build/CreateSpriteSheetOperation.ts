import BuildOperation from "./BuildOperation";
import BuildOperationLog from "./BuildOperationLog";
import potpack, {PotpackStats} from "potpack";
import {Application, Sprite, Texture} from "pixi.js";
import {textureFromURLAtomFamily} from "@/hooks/texture/useTextureFromURL";
import LISpriteAtlas from "../../types/li/LISpriteAtlas";
import generateGUID from "../../utils/strings/generateGUID";
import {spritesAtlasesAtom} from "../documentStore";
import {encodeBitmapToDDS} from "@/utils/dds/convertImageToDDS";
import {allAssetsAtom, MapAsset} from "../assets/assetsStore";
import store from "../../shared/store";
import primaryStore from "../../shared/store";
import {createAsset} from "../assets/createAsset";
import executeCommand from "../history/executeCommand";
import {replaceMapAsset} from "@editor/elements/replaceMapAsset";

const MAX_BATCH_SIZE = 100;
const MAX_SPRITE_SIZE = 2048; // Skips assets larger than this
const PADDING_SIZE = 2; // Pixels between sprites in the sheet

const CreateSpriteSheetOperation: BuildOperation = {
    async run() {
        // Get all image assets from the map
        const allMapAssets = store.get(allAssetsAtom) || [];
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

        // Split into batches if too many assets
        const batchCount = Math.ceil(imageAssets.length / MAX_BATCH_SIZE);
        const batchSize = Math.ceil(imageAssets.length / batchCount);

        // Process each batch
        for (let batchIndex = 0; batchIndex < batchCount; batchIndex++) {

            // Get assets for this batch
            const batchAssets = imageAssets.slice(
                batchIndex * batchSize,
                (batchIndex + 1) * batchSize);

            // Process batch
            BuildOperationLog.info(`Processing batch ${batchIndex + 1} of ${batchCount} (${batchAssets.length} assets)...`);
            await combineMapAssetsIntoSpriteSheet(batchAssets);
        }
    }
};

export default CreateSpriteSheetOperation;

/**
 * Combines multiple map assets into a single sprite sheet and updates references.
 * @param imageAssets - Array of MapAsset to combine into a sprite sheet
 */
async function combineMapAssetsIntoSpriteSheet(imageAssets: MapAsset[]) {
    // Load PIXI texture for each image asset
    BuildOperationLog.info(`Loading ${imageAssets.length} textures into memory...`);

    const textures: PackableTexture[] = [];
    for (const asset of imageAssets || []) {

        // Load texture
        const texture = await primaryStore.get(textureFromURLAtomFamily(asset.url));
        if (!texture) {
            BuildOperationLog.warn(`Failed to load texture for asset ID: ${asset.id}`);
            continue;
        }

        // Skip textures that are too large
        if (texture.width > MAX_SPRITE_SIZE || texture.height > MAX_SPRITE_SIZE) {
            BuildOperationLog.warn(`Skipping asset ID: ${asset.id} (size: ${texture.width}x${texture.height} exceeds max sprite size of ${MAX_SPRITE_SIZE})`);
            continue;
        }

        // Add to packable textures list (with padding)
        textures.push({
            w: texture.width + PADDING_SIZE,
            h: texture.height + PADDING_SIZE,
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
    BuildOperationLog.info("Combining sprites into a map asset (this may take a while)...");
    const bitmapData = await combineMultipleTexturesToOne(stats, textures);
    const combinedImageBlob = encodeBitmapToDDS(bitmapData);
    const combinedImageAsset = createAsset("image/dds", combinedImageBlob);

    // Create new Sprite Atlas
    BuildOperationLog.info("Creating sprite atlases and updating references...");
    const spriteAtlases: LISpriteAtlas[] = [];
    for (const textureInfo of textures) {

        // Add texture to atlas
        const atlas: LISpriteAtlas = {
            id: generateGUID(),
            assetID: combinedImageAsset.id,
            // Position is flipped vertically because of DDS compression in Unity
            x: textureInfo.x,
            y: bitmapData.height - textureInfo.y - textureInfo.h + PADDING_SIZE,
            w: textureInfo.w - PADDING_SIZE,
            h: textureInfo.h - PADDING_SIZE,
        };
        spriteAtlases.push(atlas);

        // Change all references from map asset to sprite atlas
        // Warning: This could cause non-image references to be swapped if IDs clash
        executeCommand(replaceMapAsset(textureInfo.asset.id, atlas.id));
    }

    // Add new sprite atlases to store
    const allSpriteAtlases = primaryStore.get(spritesAtlasesAtom) || [];
    primaryStore.set(spritesAtlasesAtom, [...allSpriteAtlases, ...spriteAtlases]);

    // Log result
    BuildOperationLog.success(`Combined ${spriteAtlases.length} images into 1 ${bitmapData.width}x${bitmapData.height} asset.`);
}

/**
 * Combines multiple textures into one texture based on provided stats and positions.
 * @param stats - PotpackStats containing width and height of the combined texture
 * @param sprites - Array of PackableTexture with individual textures and their positions
 * @returns A Promise that resolves to an object containing the combined texture's bitmap and dimensions
 */
async function combineMultipleTexturesToOne(stats: PotpackStats, sprites: PackableTexture[]) {

    // Calculate nearest power of 4 for width and height (for DXT compression compatibility)
    const width = Math.ceil(stats.w / 4) * 4;
    const height = Math.ceil(stats.h / 4) * 4;

    // Create a PIXI Application to render the combined texture
    const app = new Application();
    await app.init({
        width,
        height,
        backgroundAlpha: 0,
        preserveDrawingBuffer: true,
    });

    // Add each sprite to the stage at its assigned position
    for (const sprite of sprites) {
        const pixiSprite = new Sprite(sprite.texture);
        pixiSprite.x = sprite.x;
        pixiSprite.y = sprite.y;
        app.stage.addChild(pixiSprite);
    }

    // Render the stage to a canvas
    const canvas = app.renderer.extract.canvas(app.stage);

    // Get the bitmap data from the canvas
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Failed to get 2D context from canvas");

    const imageData = ctx.getImageData(0, 0, width, height);
    return {bitmap: imageData.data, width, height};
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
