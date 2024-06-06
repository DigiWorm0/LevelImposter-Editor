import { atom, useAtomValue } from "jotai";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedElementTypeAtom = atom((get) => {
    return get(selectedElementAtom)?.type;
});

// Hooks
export default function useSelectedElemType() {
    return useAtomValue(selectedElementTypeAtom);
}