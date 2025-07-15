import {atom, useSetAtom} from "jotai";
import {viewportAtom} from "../useViewport";
import {elementFamilyAtom} from "../../elements/useElements";
import {UNITY_SCALE} from "../../../types/generic/Constants";
import {DragOffset, dragStateAtom} from "./useDragState";
import {selectedElementIDsAtom} from "../../selection/useSelectedElementIDs";
import GUID from "../../../types/generic/GUID";

export interface StartDragData {
    onClick: () => void;
    onDragStart: () => void;
    elementID: GUID;
    mouseX: number;
    mouseY: number;
}

export const startDragAtom = atom(null, (get, set, data: StartDragData) => {

    // Get the viewport and ensure it exists
    const viewport = get(viewportAtom);
    if (!viewport)
        return;

    // Convert mouse coordinates to world coordinates
    const {mouseX, mouseY} = data;
    const worldPoint = viewport.toWorld(mouseX, mouseY);
    worldPoint.x /= UNITY_SCALE;
    worldPoint.y /= -UNITY_SCALE;

    // Get all selected element IDs
    const elementIDs = new Set([
        ...get(selectedElementIDsAtom),
        data.elementID // Include the element being dragged
    ]);

    // Get drag offsets for each selected element
    const dragOffsets: DragOffset[] = [];
    for (const elementID of elementIDs) {
        const element = get(elementFamilyAtom(elementID));
        if (!element || !elementID)
            continue;

        // Convert world coordinated to offset coordinates
        const offsetX = element.x - worldPoint.x;
        const offsetY = element.y - worldPoint.y;

        dragOffsets.push({
            id: elementID,
            x: offsetX,
            y: offsetY
        });
    }

    // Set the drag state with offsets and cursor position
    set(dragStateAtom, {
        onClick: data.onClick,
        onDragStart: data.onDragStart,
        isDragging: false,
        offsets: dragOffsets
    });
});

export default function useStartDrag() {
    return useSetAtom(startDragAtom);
}