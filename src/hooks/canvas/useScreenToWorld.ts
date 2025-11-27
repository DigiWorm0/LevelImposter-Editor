import useViewport from "./useViewport";
import Vector2 from "../../types/transform/Vector2";

/**
 * Hook that provides a function to convert screen coordinates to world coordinates.
 */
export default function useScreenToWorld() {
    const viewport = useViewport();

    /**
     * Converts screen coordinates to world coordinates.
     * @param screenPosition The position in screen coordinates.
     * @returns The position in world coordinates.
     */
    return (screenPosition: Vector2): Vector2 => {
        const viewportPosition = viewport?.getGlobalPosition() || {x: 0, y: 0};
        const viewportScale = viewport?.scale || {x: 1, y: 1};

        return {
            x: (screenPosition.x - viewportPosition.x) / viewportScale.x,
            y: (screenPosition.y - viewportPosition.y) / viewportScale.y
        };
    };
}