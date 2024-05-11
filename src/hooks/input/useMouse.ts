import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// Atoms
export const mouseXAtom = atom(0);
export const mouseYAtom = atom(0);
export const mouseCursorAtom = atom("default");

// Debug
mouseXAtom.debugLabel = "mouseX";
mouseYAtom.debugLabel = "mouseY";
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

export default function useMousePos() {
    const x = useAtomValue(mouseXAtom);
    const y = useAtomValue(mouseYAtom);

    return {
        x,
        y,
    }
}
export function useSetMousePos(): (x: number, y: number) => void {
    const setX = useSetAtom(mouseXAtom);
    const setY = useSetAtom(mouseYAtom);

    const setData = (x: number, y: number) => {
        setX(x);
        setY(y);
    }

    return setData;
}