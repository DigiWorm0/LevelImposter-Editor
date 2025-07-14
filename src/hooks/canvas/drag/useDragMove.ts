import {atom, useSetAtom} from "jotai";
import {viewportAtom} from "../useViewport";
import {UNITY_SCALE} from "../../../types/generic/Constants";
import {dragStateAtom} from "./useDragState";
import getGlobalZFromLocalZ from "../../../utils/canvas/getGlobalZFromLocalZ";
import {elementFamilyAtom} from "../../elements/useElements";
import {settingsAtom} from "../../useSettings";
import {MaybeGUID} from "../../../types/generic/GUID";

export interface DragMoveData {
    elementID: MaybeGUID;
    mouseX: number;
    mouseY: number;
}

export const dragMoveAtom = atom(null, (get, set, data: DragMoveData) => {
    // Check if dragging is in progress
    const dragState = get(dragStateAtom);
    if (!dragState)
        return;

    // Check if this is the correct element being dragged
    if (dragState.elementID !== data.elementID)
        return;

    // Get the viewport and ensure it exists
    const viewport = get(viewportAtom);
    if (!viewport)
        return;

    // Convert mouse coordinates to world coordinates
    const {mouseX, mouseY} = data;
    const worldPoint = viewport.toWorld(mouseX, mouseY);
    worldPoint.x /= UNITY_SCALE;
    worldPoint.y /= -UNITY_SCALE;

    // Update the drag state with the new cursor position
    set(dragStateAtom, {
        ...dragState,
        cursorX: worldPoint.x,
        cursorY: worldPoint.y
    });

    // Get the target element from the drag state
    const element = get(elementFamilyAtom(dragState.elementID));
    if (!element || !dragState.target)
        return;

    // Update target element position based on the current cursor position
    let newX = dragState.elementOffsetX + worldPoint.x;
    let newY = dragState.elementOffsetY + worldPoint.y;
    const newZ = getGlobalZFromLocalZ(element.z, newY);

    // Snap to grid if enabled
    const {isGridSnapEnabled, gridSnapResolution} = get(settingsAtom);
    if (isGridSnapEnabled && gridSnapResolution > 0) {
        newX = Math.round(newX / gridSnapResolution) * gridSnapResolution;
        newY = Math.round(newY / gridSnapResolution) * gridSnapResolution;
    }

    // Update the target element's position
    dragState.target.x = newX * UNITY_SCALE;
    dragState.target.y = -newY * UNITY_SCALE;
    dragState.target.zIndex = -newZ;
});

export default function useDragMove() {
    return useSetAtom(dragMoveAtom);
}