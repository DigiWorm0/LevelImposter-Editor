import {atom, useSetAtom} from "jotai";
import {viewportAtom} from "../useViewport";
import {UNITY_SCALE} from "../../../types/amongus/Constants";
import {dragStateAtom} from "./useDragState";
import getGlobalZFromLocalZ from "../../../utils/canvas/getGlobalZFromLocalZ";
import {elementAtomFamily} from "../../elements/useElements";
import {settingsAtom} from "../../useSettings";
import {getMapElementRef} from "../useMapElementRef";
import {selectedElementIDsAtom} from "../../selection/useSelectedElementIDs";

export interface DragMoveData {
    mouseX: number;
    mouseY: number;
}

export const dragMoveAtom = atom(null, (get, set, data: DragMoveData) => {
    // Check if dragging is in progress
    const dragState = get(dragStateAtom);
    if (!dragState)
        return;

    // Get the viewport and ensure it exists
    const viewport = get(viewportAtom);
    if (!viewport)
        return;

    // If not already dragging, call the onDragStart callback
    if (!dragState.isDragging)
        dragState.onDragStart();

    // Convert mouse coordinates to world coordinates
    const {mouseX, mouseY} = data;
    const worldPoint = viewport.toWorld(mouseX, mouseY);
    worldPoint.x /= UNITY_SCALE;
    worldPoint.y /= -UNITY_SCALE;

    // Get the current drag offsets
    let dragOffsets = dragState.offsets;

    // Filter out any offsets that are no longer selected
    const selectedElementIDs = get(selectedElementIDsAtom);
    dragOffsets = dragOffsets.filter(offset => selectedElementIDs.includes(offset.id));

    // Update each target element's position based on the current cursor position
    for (const offset of dragOffsets) {

        // Get the target element using the offset ID
        const element = get(elementAtomFamily(offset.id));
        if (!element)
            continue;

        // Don't drag if the element is locked
        if (element.properties.isLocked)
            continue;

        // Calculate new position based on the offset and world point
        let newX = offset.x + worldPoint.x;
        let newY = offset.y + worldPoint.y;
        const newZ = getGlobalZFromLocalZ(element.z, newY);

        // Snap to grid if enabled
        const {isGridSnapEnabled, gridSnapResolution} = get(settingsAtom);
        if (isGridSnapEnabled && gridSnapResolution > 0) {
            newX = Math.round(newX / gridSnapResolution) * gridSnapResolution;
            newY = Math.round(newY / gridSnapResolution) * gridSnapResolution;
        }

        // Update the target element's position
        const ref = getMapElementRef(offset.id);
        if (!ref.current)
            continue;

        ref.current.x = newX * UNITY_SCALE;
        ref.current.y = -newY * UNITY_SCALE;
        ref.current.zIndex = -newZ;
    }

    // Update the drag state to indicate dragging is in progress
    set(dragStateAtom, {
        ...dragState,
        offsets: dragOffsets,
        isDragging: true
    });
});

export default function useDragMove() {
    return useSetAtom(dragMoveAtom);
}