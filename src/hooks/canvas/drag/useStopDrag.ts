import {atom, useSetAtom} from "jotai";
import {elementFamilyAtom} from "../../elements/useElements";
import {dragStateAtom} from "./useDragState";
import {UNITY_SCALE} from "../../../types/generic/Constants";

export const stopDragAtom = atom(null, (get, set) => {
    // Check if dragging is in progress
    const dragState = get(dragStateAtom);
    if (!dragState)
        return;

    // Get the target element ID from the drag state
    const {elementID} = dragState;
    const element = get(elementFamilyAtom(elementID));
    if (!element || !elementID)
        return;

    // Update the element's position based on the current cursor position
    set(elementFamilyAtom(elementID), {
        ...element,
        x: dragState.target.x / UNITY_SCALE,
        y: -dragState.target.y / UNITY_SCALE
    });

    // Stop dragging by resetting the drag state
    set(dragStateAtom, null);
});

export default function useStopDrag() {
    return useSetAtom(stopDragAtom);
}