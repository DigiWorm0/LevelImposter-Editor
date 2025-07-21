import {atom, useSetAtom} from "jotai";
import createDDSHeader from "../../utils/dds/write/createDDSHeader";
import writeDDSHeader from "../../utils/dds/write/writeDDSHeader";
import {createMapAssetAtom} from "./useCreateMapAsset";
import writeDXT1Texture from "../../utils/dds/write/writeDXT1Texture";
import {mapAssetsAtom} from "./useMapAssets";
import {replaceMapAssetIDAtom} from "./useReplaceMapAssetID";
import {Jimp} from "jimp";
import writeDXT5Texture from "../../utils/dds/write/writeDXT5Texture";
import {imageAtomFamily} from "../canvas/legacy/useImage";

export const encodeAssetsAtom = atom(null, async (
    get,
    set,
    onProgress?: (percent: number, assetCount: number, referenceCount: number) => void
) => {

    // Get All Map Assets
    const assets = get(mapAssetsAtom);
    if (!assets)
        return;

    // Cache Canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Failed to get canvas context");

    // Count Asset/Reference Count
    let assetCount = 0;
    let referenceCount = 0;

    // Filter for Sprites
    const spriteAssets = assets.filter(asset =>
        asset.type.startsWith("image/") &&  // Only image types
        asset.type !== "image/dds" &&       // Don't re-encode DDS
        asset.type !== "image/gif");        // Don't re-encode animated GIFs

    // Iterate Over Sprite Assets
    for (const asset of spriteAssets) {
        try {
            // Update Progress
            if (onProgress) {
                const index = spriteAssets.indexOf(asset);
                onProgress(index / spriteAssets.length, assetCount, referenceCount);
            }

            // Get Image
            const image = await get(imageAtomFamily(asset.url));

            // Re-encode Image to PNG
            // HACK: Fixes issue with Jimp throwing an error with invalid image data
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const bitmap = ctx.getImageData(0, 0, image.width, image.height).data;

            // Import into Jimp
            const jimpImage = await Jimp.fromBitmap({
                data: bitmap,
                width: image.width,
                height: image.height
            });

            // Round dimensions to nearest multiple of 4
            const width = Math.floor(jimpImage.width / 4) * 4;
            const height = Math.floor(jimpImage.height / 4) * 4;
            jimpImage.crop({w: width, h: height, x: 0, y: 0});

            // Flip vertically (fixes Unity's interpretation of DXT1 textures)
            jimpImage.flip({vertical: true, horizontal: false});

            // Check if image has semi-transparency
            // If it does, we will use DXT5 instead of DXT1
            const hasSemiTransparency = jimpImage.bitmap.data.some((value: number, index: number) => {
                // Check alpha channel (4th byte in RGBA)
                return index % 4 === 3 && value < 255 && value > 0;
            });
            const format = hasSemiTransparency ? "DXT5" : "DXT1";
            console.log(`Encoding asset ${asset.id} as ${format} (${width}x${height})`);

            // Convert Image to DDS (DXT1)
            const newHeader = createDDSHeader(width, height, format);
            const headerData = writeDDSHeader(newHeader);
            const textureData = format === "DXT5" ?
                writeDXT5Texture(newHeader, jimpImage.bitmap.data) :
                writeDXT1Texture(newHeader, jimpImage.bitmap.data);
            const buffer = Buffer.concat([headerData, textureData]);

            // Convert Buffer to Blob
            const blob = new Blob([buffer], {type: "image/vnd.ms-dds"});
            if (!blob)
                throw new Error("Error converting buffer to blob");

            // Create Map Asset
            const newAsset = set(createMapAssetAtom, {type: "image/dds", blob});
            if (!newAsset)
                throw new Error("Error creating map asset");

            // Replace Map Asset
            assetCount++;
            referenceCount += set(replaceMapAssetIDAtom, {
                fromID: asset.id,
                toID: newAsset.id
            });
        } catch (error) {
            console.warn(`Error encoding asset ${asset.id}:`, error);
        }
    }
});

export default function useEncodeAssets() {
    return useSetAtom(encodeAssetsAtom);
}