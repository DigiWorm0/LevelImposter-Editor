import {atom, useSetAtom} from "jotai";
import {createMapAssetAtom} from "../assets/useCreateMapAsset";
import {selectedElementAtom} from "../elements/useSelectedElem";
import {mapPropsAtom} from "../map/useMap";
import {spriteAtomFamily} from "./sprite/useSprite";
import {UNITY_SCALE} from "../../types/generic/Constants";

export const autoCropSpriteAtom = atom(null, async (get, set) => {

    // Get Element
    const element = get(selectedElementAtom);

    // Exit if no element
    if (!element)
        return;

    // Exit if default sprite
    if (!element.properties.spriteID)
        return;

    // Get Sprite
    const sprite = await get(spriteAtomFamily(element?.id));

    // Exit if no sprite
    if (!sprite)
        return;

    // Exit if sprite is empty
    if (sprite.width === 0 || sprite.height === 0)
        return;

    // Fix Sprite
    const canvas = document.createElement("canvas");
    canvas.width = sprite.width;
    canvas.height = sprite.height;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Failed to create canvas context");

    // Get Map Props
    const {pixelArtMode} = get(mapPropsAtom);

    // Draw Sprite
    ctx.imageSmoothingEnabled = !(pixelArtMode ?? false);
    ctx.drawImage(
        sprite,
        0,
        0,
        sprite.width,
        sprite.height
    );

    // Calculate Scale
    const xPixels = [];
    const yPixels = [];
    const spriteData = ctx.getImageData(0, 0, sprite.width, sprite.height);
    let index = 0;
    for (let y = 0; y < sprite.height; y++) {
        for (let x = 0; x < sprite.width; x++) {

            // Get Data Index of X, Y
            index = (y * sprite.width + x) * 4;

            // Check if Pixel is not Transparent
            if (spriteData.data[index + 3] > 0) {
                xPixels.push(x);
                yPixels.push(y);
            }
        }
    }

    // Exit if no pixels
    if (xPixels.length === 0 || yPixels.length === 0)
        return;

    // Sort Pixels to get Top Left and Bottom Right
    xPixels.sort(function (a, b) {
        return a - b;
    });
    yPixels.sort(function (a, b) {
        return a - b;
    });
    const lastIndex = xPixels.length - 1;
    const topLeft = {x: xPixels[0], y: yPixels[0]};
    const bottomRight = {x: xPixels[lastIndex], y: yPixels[lastIndex]};

    // Calculate New Width and Height
    const newWidth = bottomRight.x - topLeft.x;
    const newHeight = bottomRight.y - topLeft.y;

    // Exit if no new width or height
    if (newWidth === 0 || newHeight === 0)
        return;

    // Exit if new width or height is the same as the original
    if (newWidth === sprite.width && newHeight === sprite.height)
        return;

    // Cut Image Data
    const cutImageData = ctx.getImageData(xPixels[0], yPixels[0], newWidth, newHeight);

    // Calculate Offset
    const newCenter = {
        x: topLeft.x + (newWidth / 2),
        y: topLeft.y + (newHeight / 2)
    };
    const oldCenter = {
        x: sprite.width / 2,
        y: sprite.height / 2
    };
    const offset = {
        x: (oldCenter.x - newCenter.x),
        y: (oldCenter.y - newCenter.y)
    };
    const rads = element.rotation * Math.PI / 180;
    console.log(rads);
    const rotatedOffset = {
        x: offset.x * Math.cos(rads) - offset.y * Math.sin(rads),
        y: offset.x * Math.sin(rads) + offset.y * Math.cos(rads)
    };
    const scaledOffset = {
        x: rotatedOffset.x * element.xScale,
        y: rotatedOffset.y * element.yScale
    };

    // Adjust Canvas
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.putImageData(cutImageData, 0, 0);

    // Convert to Blob
    const blob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(resolve);
    });
    if (!blob)
        throw new Error("Error converting canvas to blob");

    // Create Asset
    const asset = set(createMapAssetAtom, {type: "image", blob});

    // Fix Colliders
    const colliders = element.properties.colliders?.map(collider => {
        const {points} = collider;
        return {
            ...collider,
            points: points.map(point => ({
                ...point,
                x: point.x + rotatedOffset.x / UNITY_SCALE,
                y: point.y - rotatedOffset.y / UNITY_SCALE
            }))
        };
    });

    // Fix Element
    set(selectedElementAtom, {
        ...element,
        x: element.x - scaledOffset.x / UNITY_SCALE,
        y: element.y + scaledOffset.y / UNITY_SCALE,
        properties: {
            ...element.properties,
            spriteID: asset.id,
            colliders
        }
    });
});

/**
 * Scales the sprite's image to match the element's scale then scales the element back to 1.
 * Also adds padding to the sprite to prevent clipping.
 * Useful to fix AU shader issues with malformed sprites.
 */
export default function useAutoCropSprite() {
    return useSetAtom(autoCropSpriteAtom);
}