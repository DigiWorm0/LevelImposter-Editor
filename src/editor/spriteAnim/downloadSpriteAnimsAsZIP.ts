import {elementAtomFamily} from "@editor/document/elements/useElement";
import {AsyncZippable} from "fflate";
import {textureAtomFamily} from "@/rendering/canvas2/hooks/texture/useTexture";
import {textureToImageBlob} from "@editor/assets/textureToImageBlob";
import downloadFileFromURL from "@editor/fileio/download/downloadFileFromURL";
import store from "@shared/store";
import GUID from "@shared/types/GUID";
import LISpriteAnimation from "@/types/li/LISpriteAnimation";
import {zipAsync} from "@shared/utils/zipAsync";

export const downloadSpriteAnimsAsZIP = async (
    elementID: GUID,
    fileName?: string
) => {
    const element = store.get(elementAtomFamily(elementID));
    if (!element)
        throw new Error(`Element with ID ${elementID} not found`);

    // Get all animations for element
    const animations = element.properties.animations || [];

    // Serialize Assets
    const allAssets: AsyncZippable = {};
    for (let i = 0; i < animations.length; i++)
        allAssets[`${i + 1}_${animations[i].type}`] = await animationToZIP(animations[i]);

    // Zip Assets
    const compressedData = await zipAsync(allAssets);
    const compressedBlob = new Blob([compressedData], {type: "application/zip"});

    // Download Asset
    fileName = `${fileName ?? elementID}.zip`;
    const tempFileURL = URL.createObjectURL(compressedBlob);
    downloadFileFromURL(tempFileURL, fileName);
    URL.revokeObjectURL(tempFileURL);
};

const animationToZIP = async (animation: LISpriteAnimation) => {
    const animationAssets: AsyncZippable = {};
    for (let i = 0; i < animation.frames.length; i++) {
        // Convert frame to image blob
        const frame = animation.frames[i];
        const frameTexture = await store.get(textureAtomFamily(frame.spriteID));
        if (!frameTexture)
            continue;

        const imageBlob = await textureToImageBlob(frameTexture);
        if (!imageBlob)
            continue;

        // Add to zip
        const fileName = `Frame ${i + 1}.png`;
        animationAssets[fileName] = new Uint8Array(await imageBlob.arrayBuffer());
    }

    return animationAssets;
};