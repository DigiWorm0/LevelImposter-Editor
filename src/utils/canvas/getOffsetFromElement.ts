import {Container} from "pixi.js";
import Vector2 from "../../types/transform/Vector2";
import primaryStore from "../../hooks/primaryStore";
import {viewportAtom} from "../../hooks/canvas/useViewport";

/**
 * Calculates the offset position of an element based on its world transform matrix.
 * @param element The PIXI Container element whose offset is to be calculated.
 * @param offset The local offset vector to apply to the element's position.
 * @return An object containing the calculated x and y coordinates based on the offset.
 */
export default function getOffsetFromElement(element: Container | null, offset: Vector2) {

    // Check if the element is null
    if (!element)
        return offset;

    // Get the viewport matrix from the primary store
    const viewport = primaryStore.get(viewportAtom);
    if (!viewport)
        throw new Error("Viewport is not available");

    const viewMatrix = viewport.worldTransform;
    const worldMatrix = element.worldTransform;

    // Apply the inverse of the viewport matrix to the element's world transform
    const inverseViewMatrix = viewMatrix.clone().invert();
    const matrix = inverseViewMatrix.clone().append(worldMatrix);
    const point = matrix.apply(offset);

    // Only apply offset to the x and y coordinates
    return {
        x: matrix.tx - point.x,
        y: matrix.ty - point.y
    };
}