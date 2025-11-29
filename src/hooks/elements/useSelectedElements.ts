import {atom, useAtomValue} from "jotai";
import {selectedElementIDsAtom} from "../selection/useSelectedElementIDs";
import {elementAtomFamily} from "./useElements";

// Atoms
export const selectedElementsAtom = atom((get) => {
    const selectedIDs = get(selectedElementIDsAtom);
    return selectedIDs
        .map(id => get(elementAtomFamily(id)))
        .filter(elem => elem !== undefined);
});

// Hook
export default function useSelectedElements() {
    return useAtomValue(selectedElementsAtom);
}