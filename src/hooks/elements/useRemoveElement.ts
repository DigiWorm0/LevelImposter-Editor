import {useSetAtom} from "jotai";
import {atom} from "jotai/index";
import {MaybeGUID} from "../../types/common/GUID";
import {saveHistoryAtom} from "../map/history/useHistory";
import {elementsAtom} from "../map/useMap";
import {selectedColliderIDAtom} from "./colliders/useSelectedCollider";
import {elementAtomFamily} from "./useElements";
import {selectedElementIDAtom} from "./useSelectedElem";
import {elementChildIDsAtomFamily} from "./useElementChildIDs";
import {selectedElementIDsAtom} from "../selection/useSelectedElementIDs";

export const removeElementAtom = atom(null, (get, set, id: MaybeGUID) => {
    const removeElement = (id: MaybeGUID) => {
        console.log("Removed " + id);
        elementAtomFamily.remove(id);
        set(elementsAtom, get(elementsAtom).filter((elem) => elem.id !== id));

        const childIDs = get(elementChildIDsAtomFamily(id));
        childIDs.forEach(removeElement);
    };
    removeElement(id);

    set(selectedElementIDAtom, undefined);
    set(selectedColliderIDAtom, undefined);
    set(saveHistoryAtom);
});

export const removeSelectedElementAtom = atom(null, (get, set) => {
    const selectedElementIDs = get(selectedElementIDsAtom);
    for (const id of selectedElementIDs)
        set(removeElementAtom, id);
});

// Hooks
export function useRemoveElement() {
    return useSetAtom(removeElementAtom);
}

export function useRemoveSelectedElement() {
    return useSetAtom(removeSelectedElementAtom);
}