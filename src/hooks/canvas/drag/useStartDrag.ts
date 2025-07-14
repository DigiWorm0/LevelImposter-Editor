import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../../types/generic/GUID";
import {viewportAtom} from "../useViewport";
import {elementFamilyAtom} from "../../elements/useElements";
import {UNITY_SCALE} from "../../../types/generic/Constants";
import {dragStateAtom} from "./useDragState";
import {Container} from "pixi.js";

export interface StartDragData {
    target: Container;
    mouseX: number;
    mouseY: number;
    elementID: MaybeGUID;
}

export const startDragAtom = atom(null, (get, set, data: StartDragData) => {

    // Get the viewport and ensure it exists
    const viewport = get(viewportAtom);
    if (!viewport)
        return;

    // Convert mouse coordinates to world coordinates
    const {target, mouseX, mouseY, elementID} = data;
    const worldPoint = viewport.toWorld(mouseX, mouseY);
    worldPoint.x /= UNITY_SCALE;
    worldPoint.y /= -UNITY_SCALE;

    // Convert world coordinated to offset coordinates
    const element = get(elementFamilyAtom(elementID));
    if (!element || !elementID)
        return;

    const offsetX = element.x - worldPoint.x;
    const offsetY = element.y - worldPoint.y;
    set(dragStateAtom, {
        target,
        elementID,
        elementOffsetX: offsetX,
        elementOffsetY: offsetY,
        cursorX: worldPoint.x,
        cursorY: worldPoint.y
    });
});

export default function useStartDrag() {
    return useSetAtom(startDragAtom);
}