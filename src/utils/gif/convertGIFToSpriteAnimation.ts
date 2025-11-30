import LISpriteAnimation from "../../types/li/LISpriteAnimation";
import {decompressFrames, ParsedFrame, parseGIF} from "gifuct-js";
import convertImageToDDS from "../dds/convertImageToDDS";
import primaryStore from "../../hooks/primaryStore";
import {createMapAssetAtom} from "../../hooks/assets/useCreateMapAsset";
import LISpriteAnimationFrame from "../../types/li/LISpriteAnimationFrame";
import {elementsAtom} from "../../hooks/map/useMap";
import generateGUID from "../strings/generateGUID";
import {MaybeGUID} from "../../types/common/GUID";
import {mapAssetsAtomFamily} from "../../hooks/assets/useMapAsset";
import {elementAtomFamily} from "../../hooks/elements/useElements";
import {replaceMapAssetIDAtom} from "../../hooks/assets/useReplaceMapAssetID";

/**
 * Converts a GIF Blob to a LISpriteAnimation
 * @param blob - The GIF Blob to convert
 * @returns A Promise that resolves to the created LISpriteAnimation
 */
export default async function convertGIFToSpriteAnimation(blob: Blob): Promise<LISpriteAnimation> {
    // Read the Blob as an ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();

    // Parse the GIF
    const gif = parseGIF(arrayBuffer);
    const frames = decompressFrames(gif, true);

    // Convert frames to sprite animation frames
    const animationFrames: LISpriteAnimationFrame[] = [];
    for (const frame of frames) {
        const animationFrame = await gifFrameToSpriteAnimationFrame(frame);
        animationFrames.push(animationFrame);
    }

    // Return the sprite animation
    return {
        id: generateGUID(),
        frames: animationFrames
    };
}

/**
 * Converts a GIF frame to a LISpriteAnimationFrame
 * @param frame - The GIF frame to convert
 * @returns A Promise that resolves to the created LISpriteAnimationFrame
 */
async function gifFrameToSpriteAnimationFrame(frame: ParsedFrame): Promise<LISpriteAnimationFrame> {
    // Convert frame to canvas
    frameToCanvas(frame);

    // Convert canvas to DDS
    const ddsBlob = await convertImageToDDS(canvas);

    // Create an asset for the frame
    const asset = primaryStore.set(createMapAssetAtom, {
        type: "image/dds",
        blob: ddsBlob
    });

    // Add frame to animation frames
    return {
        spriteID: asset.id,
        delay: frame.delay
    };
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let frameImageData: ImageData | undefined;

/**
 * Converts a GIF frame to a canvas element
 * @param frame - The GIF frame to convert
 * @returns The canvas element containing the frame
 */
function frameToCanvas(frame: ParsedFrame): HTMLCanvasElement {
    // Check if we have canvas context
    if (!ctx)
        throw new Error("Failed to get canvas context");

    // Check if ImageData needs to be (re)created
    if (!frameImageData ||
        frameImageData.width !== frame.dims.width ||
        frameImageData.height !== frame.dims.height) {

        // Resize canvas if needed
        canvas.width = frame.dims.width;
        canvas.height = frame.dims.height;

        // Create new ImageData for the frame
        frameImageData = ctx.createImageData(frame.dims.width, frame.dims.height);
    }

    // Copy frame patch data to ImageData
    frameImageData.data.set(frame.patch);

    // Draw the frame to the canvas
    ctx.putImageData(frameImageData, 0, 0);

    return canvas;
}

/**
 * Converts a GIF asset to a sprite animation, updating all elements using the asset
 * @param assetID - The ID of the GIF asset to convert
 * @returns A Promise that resolves to the created LISpriteAnimation
 */
export async function convertGIFAssetToSpriteAnim(assetID: MaybeGUID): Promise<LISpriteAnimation> {

    // Get Asset
    const asset = primaryStore.get(mapAssetsAtomFamily(assetID));
    if (!asset)
        throw new Error(`Asset with ID ${assetID} not found`);

    // Convert to DDS
    const animation = await convertGIFToSpriteAnimation(asset.blob);
    const stillSpriteID = animation.frames[0].spriteID;

    // Find all elements using this asset and update to use the new animation
    const allElements = primaryStore.get(elementsAtom) || [];
    const elementsToUpdate = allElements.filter(el => el.properties.spriteID === asset.id);
    for (const element of elementsToUpdate) {
        primaryStore.set(elementAtomFamily(element.id), {
            ...element,
            properties: {
                ...element.properties,
                spriteID: stillSpriteID,
                animationID: animation.id
            }
        });
    }

    // Replace all instances of the old asset with the 1st frame of the new animation
    primaryStore.set(replaceMapAssetIDAtom, {
        fromID: asset.id,
        toID: stillSpriteID
    });

    // Return new animation
    return animation;
}