import {atom, useSetAtom} from "jotai";
import {dragStateAtom} from "./useDragState";
import {UNITY_SCALE} from "../../../types/amongus/Constants";
import {getMapElementRef} from "../useMapElementRef";
import {elementsAtom} from "../../map/useMap";

export const stopDragAtom = atom(null, (get, set) => {
    // Check if dragging is in progress
    const dragState = get(dragStateAtom);
    if (!dragState)
        return;

    // Stop dragging by resetting the drag state
    set(dragStateAtom, null);

    // Update each target element's `LIElement` position based on rendered position
    const elements = get(elementsAtom);
    const offsets = dragState.offsets;
    for (const offset of offsets) {

        // Get the target element using the offset ID
        const elementIndex = elements.findIndex(e => e.id === offset.id);
        if (elementIndex < 0)
            continue;
        const element = elements[elementIndex];

        // Get the current reference to the element
        const elementRef = getMapElementRef(offset.id);
        if (!elementRef.current)
            continue;

        // Update the target element's position based on the offset
        elements[elementIndex] = {
            ...element,
            x: elementRef.current.x / UNITY_SCALE,
            y: -elementRef.current.y / UNITY_SCALE
        };
    }

    // Set the updated elements back to the atom
    set(elementsAtom, [...elements]);

    // Call the onClick callback if didn't drag
    if (!dragState.isDragging)
        dragState.onClick();
});

export default function useStopDrag() {
    return useSetAtom(stopDragAtom);
}