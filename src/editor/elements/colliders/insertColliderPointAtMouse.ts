import Vector2 from "../../../shared/types/Vector2";
import {EditorCommand} from "../../history/executeCommand";
import {getMapElementRef} from "@/hooks/canvas/useMapElementRef";
import {viewportAtom} from "@/hooks/canvas/useViewport";
import {getReverseOffsetToElement} from "@/utils/canvas/getOffsetFromElement";
import {UNITY_SCALE} from "@/types/amongus/Constants";
import getDistanceFromLine from "../../../utils/common/getDistanceFromLine";
import store from "../../../shared/store";
import {getSelectedCollider} from "./getSelectedCollider";
import {selectedElementIDAtom} from "../../selection/stores/elementSelectionStore";
import screenToWorld from "@editor/viewport/screenToWorld";

// TODO: Fetch and store `mouseScreenPosition` ourselves instead of passing it in as an argument.
export const insertColliderPointAtMouse = (mouseScreenPosition: Vector2): EditorCommand => map => {

    // Get the map element of the selected collider
    const selectedElementID = store.get(selectedElementIDAtom);
    const mapElementRef = getMapElementRef(selectedElementID);
    if (!mapElementRef.current)
        throw new Error("No selected element to insert point into");

    // Get the viewport
    const viewport = store.get(viewportAtom);
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

    // Get the selected element from the map draft
    const selectedCollider = getSelectedCollider(map);
    if (!selectedCollider)
        throw new Error("No selected collider to insert point into");

    // Find the closest pair of indices within the collider
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
    selectedCollider.points.splice(closestIndex + 1, 0, colliderPointOffset);
};