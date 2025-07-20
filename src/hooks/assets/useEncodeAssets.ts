import {atom, useSetAtom} from "jotai";
import createDDSHeader from "../../utils/dds/write/createDDSHeader";
import writeDDSHeader from "../../utils/dds/write/writeDDSHeader";
import {createMapAssetAtom} from "./useCreateMapAsset";
import writeDXT1Texture from "../../utils/dds/write/writeDXT1Texture";
import {mapAssetsAtom} from "./useMapAssets";
import {replaceMapAssetIDAtom} from "./useReplaceMapAssetID";
import {Jimp} from "jimp";
import writeDXT5Texture from "../../utils/dds/write/writeDXT5Texture";

export const encodeAssetsAtom = atom(null, async (
    get,
    set,
    onProgress?: (percent: number, assetCount: number, referenceCount: number) => void
) => {

    // Get All Map Assets
    const assets = get(mapAssetsAtom);
    if (!assets)
        return;

    // Filter for Sprites
    const spriteAssets = assets.filter(asset => asset.type === "image");

    let assetCount = 0;
    let referenceCount = 0;

    for (const asset of spriteAssets) {
        try {
            // Update Progress
            if (onProgress) {
                const index = spriteAssets.indexOf(asset);
                onProgress(index / spriteAssets.length, assetCount, referenceCount);
            }

            // Import into Jimp
            const image = await Jimp.read(asset.url);
            if (!image)
                return;

            // Round dimensions to nearest multiple of 4
            const width = Math.floor(image.width / 4) * 4;
            const height = Math.floor(image.height / 4) * 4;
            image.crop({w: width, h: height, x: 0, y: 0});

            // Flip vertically (fixes Unity's interpretation of DXT1 textures)
            image.flip({vertical: true, horizontal: false});

            // Check if image has semi-transparency
            // If it does, we will use DXT5 instead of DXT1
            const hasSemiTransparency = image.bitmap.data.some((value, index) => {
                // Check alpha channel (4th byte in RGBA)
                return index % 4 === 3 && value < 255 && value > 0;
            });
            const format = hasSemiTransparency ? "DXT5" : "DXT1";

            // Convert Image to DDS (DXT1)
            const newHeader = createDDSHeader(width, height, format);
            const headerData = writeDDSHeader(newHeader);
            const textureData = format === "DXT5" ?
                writeDXT5Texture(newHeader, image.bitmap.data) :
                writeDXT1Texture(newHeader, image.bitmap.data);
            const buffer = Buffer.concat([headerData, textureData]);

            // Convert Buffer to Blob
            const blob = new Blob([buffer], {type: "image/vnd.ms-dds"});
            if (!blob)
                throw new Error("Error converting buffer to blob");

            // Create Map Asset
            const newAsset = set(createMapAssetAtom, {type: "image/ddsFormat", blob});
            if (!newAsset)
                throw new Error("Error creating map asset");

            // Replace Map Asset
            assetCount++;
            referenceCount += set(replaceMapAssetIDAtom, {
                fromID: asset.id,
                toID: newAsset.id
            });
        } catch (error) {
            console.warn("Error compressing sprite:", error);
        }
    }
});

export default function useEncodeAssets() {
    return useSetAtom(encodeAssetsAtom);
}