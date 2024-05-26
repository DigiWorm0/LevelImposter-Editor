import { useSetAtom } from "jotai";
import { atom } from "jotai/index";
import { MaybeGUID } from "../../types/generic/GUID";
import { saveHistoryAtom } from "../map/history/useHistory";
import { elementsAtom } from "../map/useMap";
import { selectedColliderIDAtom } from "./colliders/useSelectedCollider";
import { elementFamilyAtom } from "./useElements";
import { selectedElementAtom } from "./useSelectedElem";
import { elementChildIDsAtomFamily } from "./useElementChildIDs";

export const removeElementAtom = atom(null, (get, set, id: MaybeGUID) => {
    const removeElement = (id: MaybeGUID) => {
        console.log("Removed " + id);
        elementFamilyAtom.remove(id);
        set(selectedElementAtom, undefined);
        set(selectedColliderIDAtom, undefined);
        set(elementsAtom, get(elementsAtom).filter((elem) => elem.id !== id));

        const childIDs = get(elementChildIDsAtomFamily(id));
        childIDs.forEach((childID) => {
            removeElement(childID);
        });
    };
    removeElement(id);
    set(saveHistoryAtom);
});

export const removeSelectedElementAtom = atom(null, (get, set) => {
    const selectedElem = get(selectedElementAtom);
    if (selectedElem)
        set(removeElementAtom, selectedElem.id);
});

// Hooks
export function useRemoveElement() {
    return useSetAtom(removeElementAtom);
}

export function useRemoveSelectedElement() {
    return useSetAtom(removeSelectedElementAtom);
}