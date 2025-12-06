import {atom, useSetAtom} from "jotai";
import {elementIDsAtom} from "../elements/useElementIDs";
import {selectedElementIDsAtom} from "../selection/useSelectedElementIDs";

export const selectAllElementsAtom = atom(null, (get, set) => {
    const elementIDs = get(elementIDsAtom);
    set(selectedElementIDsAtom, elementIDs);
});

export default function useSelectAllElements() {
    return useSetAtom(selectAllElementsAtom);
}