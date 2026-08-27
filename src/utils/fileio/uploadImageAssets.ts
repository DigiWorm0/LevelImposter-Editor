import openUploadDialog, {openMultipleUploadDialog} from "../fileio/openUploadDialog";
import duplicateBlob from "../fileio/duplicateBlob";
import parseAssetType from "../fileio/parseAssetType";
import primaryStore from "../../hooks/primaryStore";
import {settingsAtom} from "@/hooks/useSettings";
import {convertImageBlobToDDS} from "../dds/convertImageToDDS";
import MapAsset from "../../types/li/MapAsset";
import {SUPPORTED_IMAGE_TYPES} from "@/types/amongus/Constants";
import {createAsset} from "@editor/assets/createAsset";

/**
 * Opens a file dialog to upload image files, processes them,
 * and creates map assets for each uploaded image.
 *
 * @param fileTypes A comma-separated string of accepted file types (e.g., "image/png,image/jpeg").
 * @returns An array of created map assets.
 */
export default async function uploadImageAssets(fileTypes?: string) {

    // Open file dialog to select image files
    const files = await openMultipleUploadDialog(fileTypes ?? SUPPORTED_IMAGE_TYPES.join(","));

    // Process each selected file
    const createdAssets: MapAsset[] = [];
    for (const file of files)
        createdAssets.push(await processImageFile(file));

    // Return the created map assets
    return createdAssets;
}

/**
 * Opens a file dialog to upload a single image file, processes it,
 * and creates a map asset for the uploaded image.
 *
 * @param fileTypes A comma-separated string of accepted file types (e.g., "image/png,image/jpeg").
 * @returns The created map asset.
 */
export async function uploadImageAsset(fileTypes?: string) {
    // Open file dialog to select a single image file
    const file = await openUploadDialog(fileTypes ?? SUPPORTED_IMAGE_TYPES.join(","));

    // Process the selected file
    return processImageFile(file);
}

/**
 * Processes an image file: duplicates it, identifies its type,
 * converts it to DDS if needed, and creates a map asset.
 * @param file The image file to process.
 * @returns The created map asset.
 */
async function processImageFile(file: File) {
    // Duplicate the Blob to avoid issues with modifying the original file
    let blob = await duplicateBlob(file);

    // Identify the asset type
    const arrayBuffer = await blob.arrayBuffer();
    let assetType = parseAssetType(arrayBuffer);

    // Check if the asset type is valid
    if (!assetType.startsWith("image/"))
        throw new Error(`Unsupported file type: ${assetType}`);


    // Convert to DDS if needed
    const {autoEncodeToDDS} = primaryStore.get(settingsAtom);
    const isGIF = assetType === "image/gif";
    if (autoEncodeToDDS && !isGIF) {
        try {
            blob = await convertImageBlobToDDS(blob);
            assetType = "image/dds";
        } catch (e) {
            console.warn("Failed to convert image to DDS:", e);
        }
    }

    // Create the map asset
    return createAsset(assetType, blob);
}