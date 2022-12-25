import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { MaybeLICollider } from "../../types/li/LICollider";
import { mouseXAtom, mouseYAtom } from "./useMouse";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedColliderIDAtom = atom<MaybeGUID>(undefined);
export const selectedColliderAtom = atom(
    (get) => {
        const selectedElem = get(selectedElementAtom);
        const selectedColliderID = get(selectedColliderIDAtom);
        const selectedCollider = selectedElem?.properties.colliders?.find(
            (collider) => collider.id === selectedColliderID
        );
        return selectedCollider;
    },
    (get, set, collider: MaybeLICollider) => {
        const selectedElem = get(selectedElementAtom);
        const colliders = selectedElem?.properties.colliders;
        const index = colliders?.findIndex((c) => c.id === collider?.id);
        if (index != undefined && index >= 0 && colliders != undefined && collider != undefined) {
            colliders[index] = collider;
            set(selectedElementAtom, selectedElem);
        }
    }
);
export const isSelectedColliderAtom = atom(
    (get) => {
        return get(selectedColliderIDAtom) != undefined;
    }
);
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
selectedColliderIDAtom.debugLabel = "selectedColliderIDAtom";
selectedColliderAtom.debugLabel = "selectedColliderAtom";
isSelectedColliderAtom.debugLabel = "isSelectedColliderAtom";
insertColliderPointAtMouseAtom.debugLabel = "insertColliderPointAtMouseAtom";

// Hooks
export function useSelectedColliderID() {
    return useAtom(selectedColliderIDAtom);
}
export function useSetSelectedColliderID() {
    return useSetAtom(selectedColliderIDAtom);
}
export function useSelectedColliderIDValue() {
    return useAtomValue(selectedColliderIDAtom);
}

export default function useSelectedCollider() {
    return useAtom(selectedColliderAtom);
}
export function useSetSelectedCollider() {
    return useSetAtom(selectedColliderAtom);
}
export function useSelectedColliderValue() {
    return useAtomValue(selectedColliderAtom);
}

export function useIsSelectedCollider() {
    return useAtomValue(isSelectedColliderAtom);
}
export function useInsertPointAtMouse() {
    return useSetAtom(insertColliderPointAtMouseAtom);
}