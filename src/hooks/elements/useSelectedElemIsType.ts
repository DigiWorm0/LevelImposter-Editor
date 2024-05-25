import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedElementIsTypeAtom = atomFamily((type: string) => {
    return atom((get) => {
        const selectedElement = get(selectedElementAtom);
        return selectedElement && selectedElement.type === type;
    });
});

// Hooks
export default function useIsSelectedElemType(type: string) {
    return useAtomValue(selectedElementIsTypeAtom(type));
}