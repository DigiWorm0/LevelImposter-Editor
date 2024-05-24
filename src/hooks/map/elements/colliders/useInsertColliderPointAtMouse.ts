import { atom } from "jotai/index";
import { selectedElementAtom } from "../useSelectedElem";
import { mouseXAtom, mouseYAtom } from "../../../input/useMouse";
import { selectedColliderAtom } from "./useSelectedCollider";
import { useSetAtom } from "jotai";

// Atom
export const insertColliderPointAtMouseAtom = atom(null, (get, set, index: number) => {
    const selectedElem = get(selectedElementAtom);
    const selectedCollider = get(selectedColliderAtom);
    if (selectedCollider && selectedElem) {
        const mouseX = get(mouseXAtom);
        const mouseY = get(mouseYAtom);
        selectedCollider.points.splice(index, 0, {
            x: (mouseX - selectedElem.x) / selectedElem.xScale,
            y: (-mouseY + selectedElem.y) / selectedElem.yScale
        });
        set(selectedColliderAtom, { ...selectedCollider });
    }
});

// Debug
insertColliderPointAtMouseAtom.debugLabel = "insertColliderPointAtMouseAtom";

// Hooks
export function useInsertPointAtMouse() {
    return useSetAtom(insertColliderPointAtMouseAtom);
}