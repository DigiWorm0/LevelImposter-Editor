// Cached image canvas
import createDDSHeader from "./write/createDDSHeader";
import writeDDSHeader from "./write/writeDDSHeader";
import writeDXT5Texture from "./write/writeDXT5Texture";
import writeDXT1Texture from "./write/writeDXT1Texture";
import GUID, {MaybeGUID} from "../../types/common/GUID";
import primaryStore from "../../hooks/primaryStore";
import {imageAtomFamily} from "../../hooks/canvas/legacy/useImage";
import {createMapAssetAtom} from "../../hooks/assets/useCreateMapAsset";
import {replaceMapAssetIDAtom} from "../../hooks/assets/useReplaceMapAssetID";
import {mapAssetsAtomFamily} from "../../hooks/assets/useMapAsset";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

/**
 * Converts an HTMLImageElement to a DDS Blob using DXT1 or DXT5 compression.
 * @param image - The image to convert
 */
export default async function convertImageToDDS(image: HTMLImageElement): Promise<Blob> {

    // Round dimensions to nearest multiple of 4
    const width = Math.floor(image.width / 4) * 4;
    const height = Math.floor(image.height / 4) * 4;

    // Create canvas
    canvas.width = width;
    canvas.height = height;
    if (!ctx)
        throw new Error("Failed to get canvas context");

    // Flip vertically (fixes Unity's interpretation of DXT1 textures)
    ctx.clearRect(0, 0, width, height);
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.drawImage(image, 0, 0, width, height);

    // Get image bitmap data
    const imageData = ctx.getImageData(0, 0, width, height);
    const bitmap = imageData.data;

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
 * Converts an image Blob to a DDS Blob.
 * @param imageBlob - The image Blob to convert
 * @returns A Promise that resolves to the DDS Blob
 */
export async function convertImageBlobToDDS(imageBlob: Blob): Promise<Blob> {
    const imageURL = URL.createObjectURL(imageBlob);
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = imageURL;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
    });
    URL.revokeObjectURL(imageURL);
    return convertImageToDDS(image);
}

/**
 * Converts a map image asset to a DDS asset, replacing all instances of the old asset.
 * @param assetID - The ID of the image asset to convert
 * @returns A Promise that resolves to the new DDS asset ID
 */
export async function convertImageAssetToDDS(assetID: MaybeGUID): Promise<GUID> {

    // Get Asset
    const asset = primaryStore.get(mapAssetsAtomFamily(assetID));
    if (!asset)
        throw new Error(`Asset with ID ${assetID} not found`);

    // Get Image from Asset
    const image = await primaryStore.get(imageAtomFamily(asset.url));

    // Convert to DDS
    const blob = await convertImageToDDS(image);

    // Create new asset
    const newMapAsset = primaryStore.set(createMapAssetAtom, {
        type: "image/dds",
        blob
    });

    // Replace all instances of the old asset with new one
    primaryStore.set(replaceMapAssetIDAtom, {
        fromID: asset.id,
        toID: newMapAsset.id
    });

    // Return new asset ID
    return newMapAsset.id;
}