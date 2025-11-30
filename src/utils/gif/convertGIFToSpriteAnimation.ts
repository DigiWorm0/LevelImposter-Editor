import LISpriteAnimation from "../../types/li/LISpriteAnimation";
import {decompressFrames, ParsedFrame, parseGIF} from 'gifuct-js'
import convertImageToDDS from "../dds/convertImageToDDS";
import primaryStore from "../../hooks/primaryStore";
import {createMapAssetAtom} from "../../hooks/assets/useCreateMapAsset";
import LISpriteAnimationFrame from "../../types/li/LISpriteAnimationFrame";
import {animationsAtom} from "../../hooks/map/useMap";
import generateGUID from "../strings/generateGUID";

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

    // Create the sprite animation
    const spriteAnimation: LISpriteAnimation = {
        id: generateGUID(),
        frames: animationFrames
    };

    // Add the animation to the map
    const allSpriteAnimations = primaryStore.get(animationsAtom);
    primaryStore.set(animationsAtom, [...(allSpriteAnimations || []), spriteAnimation]);

    // Return the created sprite animation
    return spriteAnimation;
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