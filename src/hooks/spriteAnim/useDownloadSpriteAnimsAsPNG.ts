// Trim Assets
import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "@/types/common/GUID";
import {AsyncZippable, zip} from "fflate";
import {mapAssetAsImageBlobAtomFamily} from "../assets/useMapAssetAsImageBlob";
import downloadFileFromURL from "@editor/fileio/downloadFileFromURL";

import {elementAtomFamily} from "@editor/documentStore";

export interface DownloadAssetPayload {
    elementID: MaybeGUID;
    fileName?: string;
}

// Atom
export const downloadSpriteAnimsAsPNGAtom = atom(null, async (get, _, payload: DownloadAssetPayload) => {

    // Get Element
    const element = get(elementAtomFamily(payload.elementID));
    if (!element)
        return;

    // Get all animations for element
    const animations = element.properties.animations || [];

    // Serialize Assets
    const allAssets: AsyncZippable = {};
    for (let i = 0; i < animations.length; i++) {

        // Create folder for animation
        const animationAssets: AsyncZippable = {};
        const animation = animations[i];
        allAssets[`${i + 1}_${animation.type}`] = animationAssets;

        // Get all frames for animation
        for (let i = 0; i < animation.frames.length; i++) {
            try {
                // Convert frame to image blob
                const frame = animation.frames[i];
                const imageBlob = await get(mapAssetAsImageBlobAtomFamily(frame.spriteID));
                if (!imageBlob)
                    continue;

                // Add to zip
                const fileName = `Frame ${i + 1}.png`;
                animationAssets[fileName] = new Uint8Array(await imageBlob.arrayBuffer());

            } catch (error) {
                // Log error but continue processing other frames
                console.error(`Failed to process frame ${i}/${animation.frames.length} in animation ${animation.id}:`, error);
            }
        }
    }

    // Add animation metadata
    const metadata = JSON.stringify(animations, null, 2);
    allAssets["metadata.json"] = new Uint8Array(new TextEncoder().encode(metadata));

    // Zip Assets
    const compressedData = await new Promise<Uint8Array>((resolve, reject) => {
        zip(allAssets, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
    const compressedBlob = new Blob([compressedData], {type: "application/zip"});

    // Download Asset
    const fileName = `${payload.fileName ?? payload.elementID}.zip`;
    const fileURL = URL.createObjectURL(compressedBlob);
    downloadFileFromURL(fileURL, fileName);
    URL.revokeObjectURL(fileURL);
});

// Hooks
export default function useDownloadSpriteAnimsAsPNG() {
    return useSetAtom(downloadSpriteAnimsAsPNGAtom);
}