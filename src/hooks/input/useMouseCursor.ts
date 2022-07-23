import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { mouseCursorAtom } from "../jotai/Jotai";


export default function useMouseCursor() {
    return useAtom(mouseCursorAtom);
}

export function useMouseCursorValue() {
    return useAtomValue(mouseCursorAtom);
}

export function useSetMouseCursor() {
    return useSetAtom(mouseCursorAtom);
}