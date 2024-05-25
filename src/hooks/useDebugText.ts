import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// Atoms
export const debugTextAtom = atom("");

// Hooks
export default function useDebugText() {
    return useAtom(debugTextAtom);
}

export function useSetDebugText() {
    return useSetAtom(debugTextAtom);
}

export function useDebugTextValue() {
    return useAtomValue(debugTextAtom);
}