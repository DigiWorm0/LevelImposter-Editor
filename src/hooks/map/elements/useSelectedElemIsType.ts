import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedElementIsTypeAtom = atomFamily((type: string) => {
    return atom((get) => {
        const selectedElement = get(selectedElementAtom);
        return selectedElement?.type === type;
    });
});

// Hooks
export default function useIsSelectedElemType(type: string) {
    return useAtom(selectedElementIsTypeAtom(type));
}