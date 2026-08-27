import LISpriteAnimation from "../../types/li/LISpriteAnimation";
import {decompressFrames, ParsedFrame, parseGIF} from "gifuct-js";
import primaryStore from "../../hooks/primaryStore";
import LISpriteAnimationFrame from "../../types/li/LISpriteAnimationFrame";
import {allElementsAtom} from "../../editor/state/documentStore";
import generateGUID from "../strings/generateGUID";
import {MaybeGUID} from "../../types/common/GUID";
import canvasToBitmap from "../canvas/canvasToBitmap";
import {encodeBitmapToDDS} from "../dds/convertImageToDDS";
import {createAsset} from "../../editor/assets/createAsset";
import store from "../../shared/store";
import {assetsAtomFamily} from "../../editor/state/assetsStore";

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

    // Create new canvas for drawing frames
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Failed to get canvas context");

    canvas.width = gif.lsd.width;
    canvas.height = gif.lsd.height;

    // Convert frames to sprite animation frames
    const animationFrames: LISpriteAnimationFrame[] = [];
    for (const frame of frames) {
        const animationFrame = await gifFrameToSpriteAnimationFrame(frame, ctx);
        animationFrames.push(animationFrame);
    }

    // Return the sprite animation
    return {
        id: generateGUID(),
        frames: animationFrames,
        type: "default"
    };
}

/**
 * Splits animation frames into sub-animations based on element type
 * @param elementType - The type of the element
 * @param animationFrames - The animation frames to split
 * @returns An array of LISpriteAnimations
 */
export function getSubAnimationsFromElementType(
    elementType: string,
    animationFrames: LISpriteAnimationFrame[]
): LISpriteAnimation[] {

    // Handle door animations
    if (elementType.startsWith("sab-door")) {
        return [
            {id: generateGUID(), frames: animationFrames, type: "closeDoor", loop: false},
            {id: generateGUID(), frames: [...animationFrames].reverse(), type: "openDoor", loop: false}
        ];
    }

    // Handle vent animations
    if (elementType.startsWith("util-vent")) {
        return [
            {id: generateGUID(), frames: animationFrames, type: "enterVent", loop: false},
            {id: generateGUID(), frames: [...animationFrames].reverse(), type: "exitVent", loop: false}
        ];
    }

    // Handle camera animations
    if (elementType === "util-cam") {
        return [
            {id: generateGUID(), frames: [animationFrames[0]], type: "camsInactive"},
            {id: generateGUID(), frames: animationFrames, type: "camsActive"}
        ];
    }

    // Default to single animation
    return [{
        id: generateGUID(),
        frames: animationFrames,
        type: "default"
    }];
}


/**
 * Converts a GIF frame to a LISpriteAnimationFrame
 * @param frame - The GIF frame to convert
 * @param gifCanvasContext - The canvas context to use for drawing
 * @returns A Promise that resolves to the created LISpriteAnimationFrame
 */
async function gifFrameToSpriteAnimationFrame(
    frame: ParsedFrame,
    gifCanvasContext: CanvasRenderingContext2D
): Promise<LISpriteAnimationFrame> {
    // Convert frame to canvas
    frameToCanvas(frame, gifCanvasContext);
    const bitmapData = canvasToBitmap(gifCanvasContext);

    // Convert canvas to DDS
    const ddsBlob = encodeBitmapToDDS(bitmapData);

    // Create an asset for the frame
    const asset = createAsset("image/dds", ddsBlob);

    // Add frame to animation frames
    return {
        id: generateGUID(),
        spriteID: asset.id,
        delay: frame.delay
    };
}

const frameCanvas = document.createElement("canvas");
const frameCtx = frameCanvas.getContext("2d");

let frameImageData: ImageData | undefined;
let disposeNextFrame = false;

/**
 * Converts a GIF frame to a canvas element
 * @param frame - The GIF frame to convert
 * @param gifCanvasContext - Optional canvas context to use for drawing
 */
function frameToCanvas(frame: ParsedFrame, gifCanvasContext: CanvasRenderingContext2D) {
    // Check if we have canvas context
    if (!frameCtx)
        throw new Error("Failed to get canvas context");

    // Check if ImageData needs to be (re)created
    if (!frameImageData ||
        frameImageData.width !== frame.dims.width ||
        frameImageData.height !== frame.dims.height) {

        // Resize canvas if needed
        frameCanvas.width = frame.dims.width;
        frameCanvas.height = frame.dims.height;

        // Create new ImageData for the frame
        frameImageData = frameCtx.createImageData(frame.dims.width, frame.dims.height);
    }

    // Copy frame patch data to ImageData
    frameImageData.data.set(frame.patch);

    // Draw the frame to the frame canvas
    frameCtx.putImageData(frameImageData, 0, 0);

    // If the frame needs to be cleared, clear the area on the GIF canvas
    if (disposeNextFrame) {
        gifCanvasContext.clearRect(
            0,
            0,
            gifCanvasContext.canvas.width,
            gifCanvasContext.canvas.height
        );
    }
    disposeNextFrame = frame.disposalType === 2;

    // Draw the frame canvas to the target canvas context
    // This is because GIFs are additive and need to be drawn in sequence
    gifCanvasContext.drawImage(frameCanvas, frame.dims.left, frame.dims.top);
}

/**
 * Converts a GIF asset to a sprite animation, updating all elements using the asset
 * @param assetID - The ID of the GIF asset to convert
 * @returns A Promise that resolves to the created LISpriteAnimation
 */
export async function convertGIFAssetToSpriteAnim(assetID: MaybeGUID): Promise<LISpriteAnimation> {

    // Get Asset
    const asset = store.get(assetsAtomFamily(assetID));
    if (!asset)
        throw new Error(`Asset with ID ${assetID} not found`);

    // Convert to DDS
    const animation = await convertGIFToSpriteAnimation(asset.blob);
    const stillSpriteID = animation.frames[0].spriteID;

    // Find all elements using this asset and update to use the new animation
    const allElements = primaryStore.get(allElementsAtom) || [];
    const elementsToUpdate = allElements.filter(el => el.properties.spriteID === asset.id);
    for (const element of elementsToUpdate) {
        // TODO: FIX ME!!!!
        // primaryStore.set(elementAtomFamily(element.id), {
        //     ...element,
        //     properties: {
        //         ...element.properties,
        //         spriteID: stillSpriteID,
        //         animations: getSubAnimationsFromElementType(element.type, animation.frames)
        //     }
        // });
    }

    // Replace all instances of the old asset with the 1st frame of the new animation
    // TODO: FIX ME!!!!
    // primaryStore.set(replaceMapAssetIDAtom, {
    //     fromID: asset.id,
    //     toID: stillSpriteID
    // });

    // Return new animation
    return animation;
}