import {useSetAtom} from "jotai";
import {atom} from "jotai/index";
import Vector2 from "../../../types/transform/Vector2";
import {viewportAtom} from "../../canvas/useViewport";
import {UNITY_SCALE} from "../../../types/amongus/Constants";
import {selectedElementAtom} from "../useSelectedElem";
import {selectedColliderAtom} from "./useSelectedCollider";
import getDistanceFromLine from "../../../utils/common/getDistanceFromLine";

// Atom
export const insertColliderPointAtMouseAtom = atom(null, (get, set, mouseScreenPosition: Vector2) => {

    // Calculate the world position of the mouse
    const viewport = get(viewportAtom);
    if (!viewport)
        throw new Error("Viewport is not available");

    const mouseWorldPosition = viewport.toWorld(mouseScreenPosition.x, mouseScreenPosition.y);
    mouseWorldPosition.x /= UNITY_SCALE;
    mouseWorldPosition.y /= -UNITY_SCALE;

    // Calculate the position relative to the selected element
    const selectedElement = get(selectedElementAtom);
    if (!selectedElement)
        throw new Error("No selected element to insert point into");

    const mouseElementPosition = {
        x: mouseWorldPosition.x - selectedElement.x,    // TODO: Handle nested transforms
        y: -(mouseWorldPosition.y - selectedElement.y)
    };

    // Find the closest pair of indices within the collider
    const selectedCollider = get(selectedColliderAtom);
    if (!selectedCollider)
        throw new Error("No selected collider to insert point into");

    let closestIndex = -1;
    let closestDistance = Infinity;
    for (let i = 0; i < selectedCollider.points.length - 1; i++) {
        const point = selectedCollider.points[i];
        const nextPoint = selectedCollider.points[i + 1];

        // Calculate the distance from the mouse position to the line segment
        const distance = getDistanceFromLine(mouseElementPosition, point, nextPoint);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
        }
    }

    if (closestIndex === -1)
        throw new Error("No closest index found in collider points");

    // Insert the new point at the closest index
    const newPoints = [...selectedCollider.points];
    newPoints.splice(closestIndex + 1, 0, mouseElementPosition);

    set(selectedColliderAtom, {
        ...selectedCollider,
        points: newPoints
    });
});

// Debug
insertColliderPointAtMouseAtom.debugLabel = "insertColliderPointAtMouseAtom";

// Hooks
export function useInsertPointAtMouse() {
    return useSetAtom(insertColliderPointAtMouseAtom);
}