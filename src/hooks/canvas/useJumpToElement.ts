import {MaybeGUID} from "../../types/common/GUID";
import {atom, useSetAtom} from "jotai";
import {elementAtomFamily} from "../elements/useElements";
import {viewportAtom} from "./useViewport";
import {UNITY_SCALE} from "../../types/amongus/Constants";

export const jumpToElementAtom = atom(null, (get, set, elementID: MaybeGUID) => {
    if (!elementID)
        return;

    // Get the element
    const element = get(elementAtomFamily(elementID));
    if (!element)
        return;

    // Get the viewport
    const viewport = get(viewportAtom);
    if (!viewport)
        return;

    // Move the viewport to the element's position
    // TODO: Animate me
    viewport.moveCenter({
        x: element.x * UNITY_SCALE,
        y: -element.y * UNITY_SCALE
    });
    viewport.emit("moved", {viewport, type: "snap"});

});

export default function useJumpToElement() {
    return useSetAtom(jumpToElementAtom);
}