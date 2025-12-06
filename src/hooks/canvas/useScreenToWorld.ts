import {viewportAtom} from "./useViewport";
import Vector2 from "../../types/transform/Vector2";
import primaryStore from "../primaryStore";

/**
 * Converts screen coordinates to world coordinates.
 * @param screenPosition The position in screen coordinates.
 * @returns The position in world coordinates.
 */
export default function screenToWorld(screenPosition: Vector2): Vector2 {
    const viewport = primaryStore.get(viewportAtom);

    const viewportPosition = viewport?.getGlobalPosition() || {x: 0, y: 0};
    const viewportScale = viewport?.scale || {x: 1, y: 1};

    return {
        x: (screenPosition.x - viewportPosition.x) / viewportScale.x,
        y: (screenPosition.y - viewportPosition.y) / viewportScale.y
    };
}