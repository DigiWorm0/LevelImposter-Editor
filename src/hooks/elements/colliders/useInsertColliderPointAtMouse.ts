import { useSetAtom } from "jotai";
import { atom } from "jotai/index";
import { mouseXAtom, mouseYAtom } from "../../input/useMouse";
import { selectedElementAtom } from "../useSelectedElem";
import { selectedColliderAtom } from "./useSelectedCollider";

// Atom
export const insertColliderPointAtMouseAtom = atom(null, (get, set, index: number) => {
    const selectedElem = get(selectedElementAtom);
    const selectedCollider = get(selectedColliderAtom);
    if (selectedCollider && selectedElem) {
        const mouseX = get(mouseXAtom);
        const mouseY = get(mouseYAtom);
        const points = [...selectedCollider.points];
        points.splice(index, 0, {
            x: (mouseX - selectedElem.x) / selectedElem.xScale,
            y: (-mouseY + selectedElem.y) / selectedElem.yScale
        });
        set(selectedColliderAtom, { ...selectedCollider, points });
    }
});

// Debug
insertColliderPointAtMouseAtom.debugLabel = "insertColliderPointAtMouseAtom";

// Hooks
export function useInsertPointAtMouse() {
    return useSetAtom(insertColliderPointAtMouseAtom);
}