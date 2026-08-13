import {atom, useSetAtom} from "jotai";
import Vector2 from "../../../types/transform/Vector2";
import {viewportAtom} from "../../canvas/useViewport";
import {selectedElementIDAtom} from "../useSelectedElem";
import {selectedColliderAtom} from "./useSelectedCollider";
import getDistanceFromLine from "../../../utils/common/getDistanceFromLine";
import {getMapElementRef} from "../../canvas/useMapElementRef";
import screenToWorld from "../../canvas/useScreenToWorld";
import {getReverseOffsetToElement} from "../../../utils/canvas/getOffsetFromElement";
import {UNITY_SCALE} from "../../../types/amongus/Constants";

// Atom
export const insertColliderPointAtMouseAtom = atom(null, (get, set, mouseScreenPosition: Vector2) => {

    // Get the map element of the selected collider
    const selectedElementID = get(selectedElementIDAtom);
    const mapElementRef = getMapElementRef(selectedElementID);
    if (!mapElementRef.current)
        throw new Error("No selected element to insert point into");

    // Get the viewport
    const viewport = get(viewportAtom);
    if (!viewport)
        throw new Error("Viewport is not available");

    // Calculate the world position of the selected element
    const elementScreenPos = mapElementRef.current.getGlobalPosition();
    const elementWorldPosition = screenToWorld(elementScreenPos);

    // Calculate the world position of the mouse
    const mouseWorldPosition = screenToWorld(mouseScreenPosition);

    // Calculate the mouse position relative to the element
    const mouseElementOffset = getReverseOffsetToElement(mapElementRef.current, {
        x: -mouseWorldPosition.x + elementWorldPosition.x,
        y: -mouseWorldPosition.y + elementWorldPosition.y
    });
    const colliderPointOffset = {
        x: mouseElementOffset.x / UNITY_SCALE,
        y: mouseElementOffset.y / UNITY_SCALE
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
        const distance = getDistanceFromLine(colliderPointOffset, point, nextPoint);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
        }
    }

    if (closestIndex === -1)
        throw new Error("No closest index found in collider points");

    // Insert the new point at the closest index
    const newPoints = [...selectedCollider.points];
    newPoints.splice(closestIndex + 1, 0, colliderPointOffset);

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