import { atom, useSetAtom } from "jotai";
import { createMapAssetAtom } from "../assets/useCreateMapAsset";
import { selectedElementAtom } from "../elements/useSelectedElem";
import { mapPropsAtom } from "../map/useMap";
import { spriteAtomFamily } from "./sprite/useSprite";

const SPRITE_PADDING = 10; // px

export const fixSpriteScalingAtom = atom(null, async (get, set) => {

    // Get Properties
    const element = get(selectedElementAtom);
    const sprite = await get(spriteAtomFamily(element?.id));
    const properties = get(mapPropsAtom);

    // Exit if no element or sprite
    if (!element || !sprite)
        return;

    // Get Scale
    const xScale = Math.abs(element.xScale);
    const yScale = Math.abs(element.yScale);

    // Fix Sprite
    const canvas = document.createElement("canvas");
    canvas.width = (sprite.width * xScale) + (SPRITE_PADDING * 2);
    canvas.height = (sprite.height * yScale) + (SPRITE_PADDING * 2);
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Failed to create canvas context");

    // Draw Sprite
    ctx.imageSmoothingEnabled = !(properties.pixelArtMode ?? false);
    ctx.drawImage(
        sprite,
        SPRITE_PADDING,
        SPRITE_PADDING,
        sprite.width * xScale,
        sprite.height * yScale
    );

    // Convert to Blob
    const blob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(resolve);
    });
    if (!blob)
        throw new Error("Error converting canvas to blob");

    // Create Asset
    const asset = set(createMapAssetAtom, { type: "image", blob });

    // Fix Colliders
    const colliders = element.properties.colliders?.map(collider => {
        const { points } = collider;
        return {
            ...collider,
            points: points.map(point => ({
                ...point,
                x: point.x * xScale,
                y: point.y * yScale
            }))
        }
    });

    // Fix Element
    set(selectedElementAtom, {
        ...element,
        xScale: element.xScale < 0 ? -1 : 1,
        yScale: element.yScale < 0 ? -1 : 1,
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
export default function useFixSpriteScaling() {
    return useSetAtom(fixSpriteScalingAtom);
}