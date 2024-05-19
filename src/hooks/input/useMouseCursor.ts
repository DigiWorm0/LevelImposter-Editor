import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// Atoms
export const mouseCursorAtom = atom("default");

// Debug
mouseCursorAtom.debugLabel = "mouseCursor";

// Hooks
export function useMouseCursor() {
    return useAtom(mouseCursorAtom);
}

export function useSetMouseCursor() {
    return useSetAtom(mouseCursorAtom);
}

export function useMouseCursorValue() {
    return useAtomValue(mouseCursorAtom);
}