import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { selectedElementTypeAtom } from "./useSelectedElemType";

// Atoms
export const selectedElementIsTypeAtom = atomFamily((type: string) => {
    return atom((get) => {
        const selectedElementType = get(selectedElementTypeAtom);
        return type === selectedElementType;
    });
});

// Hooks
export default function useIsSelectedElemType(type: string) {
    return useAtomValue(selectedElementIsTypeAtom(type));
}