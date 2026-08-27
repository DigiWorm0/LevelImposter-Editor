import {Container} from "pixi.js";
import Vector2 from "../../types/transform/Vector2";
import {viewportAtom} from "@/hooks/canvas/useViewport";
import primaryStore from "@/shared/store";

/**
 * Apply's the element's transformation matrix to a point
 * @param element The element's PIXI container
 * @param offset A local position relative to the element in object space
 * @return A local position relative to the element in world space
 */
export default function getOffsetFromElement(element: Container | null, offset: Vector2) {
    if (!element)
        return offset;

    const objectMatrix = getWorldObjectMatrix(element);
    const worldOffset = objectMatrix.apply(offset);

    return {
        x: objectMatrix.tx - worldOffset.x,
        y: objectMatrix.ty - worldOffset.y
    };
}

/**
 * Apply's the inverse of the element's transformation matrix to a point.
 * Does the reverse of {@link getOffsetFromElement}.
 * @param element The element's PIXI container
 * @param offset A local position relative to the element in world space
 * @return A local position relative to the element in object space
 */
export function getReverseOffsetToElement(element: Container | null, offset: Vector2) {
    if (!element)
        return offset;

    const objectMatrix = getWorldObjectMatrix(element);
    const inverseObjectMatrix = objectMatrix.clone().invert();
    const localOffset = inverseObjectMatrix.apply(offset);

    return {
        x: inverseObjectMatrix.tx - localOffset.x,
        y: inverseObjectMatrix.ty - localOffset.y
    };
}

/**
 * Gets the transformation matrix of an object relative to the world
 * @param container The PIXI container
 * @return The transformation matrix
 */
function getWorldObjectMatrix(container: Container) {
    const viewport = primaryStore.get(viewportAtom);
    if (!viewport)
        throw new Error("Viewport is not available");

    const viewMatrix = viewport.worldTransform;
    const objectMatrix = container.worldTransform;

    const inverseViewMatrix = viewMatrix.clone().invert();
    return inverseViewMatrix.clone().append(objectMatrix);
}