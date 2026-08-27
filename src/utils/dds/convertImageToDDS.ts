// Cached image canvas
import createDDSHeader from "./write/createDDSHeader";
import writeDDSHeader from "./write/writeDDSHeader";
import writeDXT5Texture from "./write/writeDXT5Texture";
import writeDXT1Texture from "./write/writeDXT1Texture";
import {MaybeGUID} from "@/types/common/GUID";
import {Application, Sprite, Texture} from "pixi.js";
import {textureFromURLAtomFamily} from "@/hooks/texture/useTextureFromURL";
import {textureAtomFamily} from "@/hooks/texture/useTexture";
import BitmapData from "../../types/texture/BitmapData";
import {createAsset} from "@editor/assets/createAsset";
import executeCommand from "../../editor/history/executeCommand";
import {replaceMapAsset} from "@editor/commands/elements/replaceMapAsset";
import primaryStore from "@/shared/store";

/**
 * Converts bitmap data to a DDS Blob using DXT1 or DXT5 compression.
 * Bitmap width/height are adjusted to be multiples of 4 if needed.
 * In addition, the image is encoded upside-down to match Unity's DDS expectations.
 * @param bitmapData - The bitmap data including the bitmap array, width, and height
 * @returns A Blob containing the DDS data
 */
export function encodeBitmapToDDS(bitmapData: BitmapData): Blob {

    // Prepare bitmap for DDS conversion
    const {bitmap, width, height} = prepareBitmapForDDS(bitmapData);

    // Check if image has semi-transparency
    // If it does, we will use DXT5 instead of DXT1
    const hasSemiTransparency = bitmap.some((value: number, index: number) => {
        // Check alpha channel (4th byte in RGBA)
        return index % 4 === 3 && value < 255 && value > 0;
    });
    const format = hasSemiTransparency ? "DXT5" : "DXT1";

    // Convert Image to DDS (DXT1)
    const newHeader = createDDSHeader(width, height, format);
    const headerData = writeDDSHeader(newHeader);
    const textureData = format === "DXT5" ?
        writeDXT5Texture(newHeader, bitmap) :
        writeDXT1Texture(newHeader, bitmap);
    const buffer = Buffer.concat([headerData, textureData]);

    // Convert Buffer to Blob
    const blob = new Blob([buffer], {type: "image/dds"});
    if (!blob)
        throw new Error("Error converting buffer to blob");

    return blob;
}

/**
 * Modifies bitmap data for DDS conversion by ensuring width and height are multiples of 4.
 * In addition, flips the image vertically.
 * @param bitmapData - The bitmap data including the bitmap array, width, and height
 * @return The modified bitmap data
 */
export function prepareBitmapForDDS(bitmapData: BitmapData): BitmapData {
    const {bitmap, width, height} = bitmapData;

    // Calculate new width and height (must be multiples of 4)
    const newWidth = Math.ceil(width / 4) * 4;
    const newHeight = Math.ceil(height / 4) * 4;

    // Create new bitmap array with padding
    const newBitmap = new Uint8ClampedArray(newWidth * newHeight * 4);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            for (let c = 0; c < 4; c++) {
                // Flip vertically and copy pixel data
                const srcIndex = (y * width + x) * 4 + c;
                const destIndex = ((newHeight - 1 - y) * newWidth + x) * 4 + c;
                newBitmap[destIndex] = bitmap[srcIndex];
            }
        }
    }

    return {
        bitmap: newBitmap,
        width: newWidth,
        height: newHeight
    };
}

/**
 * Converts a texture to a bitmap array.
 * @param texture - The texture to convert
 * @returns A Promise that resolves to the bitmap data in RGBA format
 */
export async function getTextureBitmap(texture: Texture): Promise<BitmapData> {

    // Create a PIXI Application to render the texture
    const app = new Application();
    await app.init({
        width: texture.width,
        height: texture.height,
        backgroundAlpha: 0,
        preserveDrawingBuffer: true,
    });

    // Add the texture as a sprite to the stage
    const sprite = new Sprite(texture);
    app.stage.addChild(sprite);

    // Render the stage to a canvas
    const canvas = app.renderer.extract.canvas(app.stage);

    // Get the bitmap data from the canvas
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Failed to get 2D context from canvas");

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return {bitmap: imageData.data, width: canvas.width, height: canvas.height};
}

/**
 * Converts an image blob to a bitmap array for DDS conversion.
 * @param imageBlob - The image blob to convert
 * @returns A Promise that resolves to the bitmap data in RGBA format
 */
export async function getTextureBitmapFromBlob(imageBlob: Blob): Promise<BitmapData> {
    const imageURL = URL.createObjectURL(imageBlob);
    const texture = await primaryStore.get(textureFromURLAtomFamily(imageURL));
    if (!texture)
        throw new Error("Failed to load texture from image blob");
    const data = await getTextureBitmap(texture);
    URL.revokeObjectURL(imageURL);
    return data;
}

/**
 * Converts an image Blob to a DDS Blob.
 * @param imageBlob - The image Blob to convert
 * @returns A Promise that resolves to the DDS Blob
 */
export async function convertImageBlobToDDS(imageBlob: Blob): Promise<Blob> {
    const bitmapData = await getTextureBitmapFromBlob(imageBlob);
    return encodeBitmapToDDS(bitmapData);
}

/**
 * Converts a map image asset to a DDS asset.
 * @param assetID - The ID of the image asset to convert
 * @returns A Promise that resolves to the new DDS asset ID
 */
export async function convertImageAssetToDDSBlob(assetID: MaybeGUID): Promise<Blob> {

    // Get Texture
    const image = await primaryStore.get(textureAtomFamily(assetID));
    if (!image)
        throw new Error("Image asset texture not found");

    // Get Bitmap (and resize if needed)
    const bitmapData = await getTextureBitmap(image);

    // Encode to DDS Blob
    return encodeBitmapToDDS(bitmapData);
}

/**
 * Converts a map image asset to a DDS asset.
 * Replaces all instances of the old asset in elements with the new asset ID.
 * @param assetID - The ID of the image asset to convert
 * @returns A Promise that resolves to the new DDS asset ID
 */
export async function convertImageAssetToDDS(assetID: MaybeGUID): Promise<MaybeGUID> {

    // Convert to DDS Blob
    const ddsBlob = await convertImageAssetToDDSBlob(assetID);

    // Create new asset ID
    const newAsset = createAsset("image/dds", ddsBlob);

    // Replace all instances of the old asset in elements with the new asset ID
    executeCommand(replaceMapAsset(assetID, newAsset.id));

    return newAsset.id;
}