import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";

// Atoms
export const hoveredElementIDAtom = atom<MaybeGUID>(undefined);

// Debug
hoveredElementIDAtom.debugLabel = "hoveredElementID";

// Hooks
export function useHoveredElemID() {
    return useAtom(hoveredElementIDAtom);
}

export function useSetHoveredElemID() {
    return useSetAtom(hoveredElementIDAtom);
}

export function useHoveredElemIDValue() {
    return useAtomValue(hoveredElementIDAtom);
}