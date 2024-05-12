import { atom } from "jotai/index";
import { MaybeGUID } from "../../../types/generic/GUID";
import { elementChildrenFamilyAtom, elementFamilyAtom } from "./useElements";
import { selectedColliderIDAtom } from "./useSelectedCollider";
import { elementsAtom } from "../useMap";
import { trimAssetsAtom } from "../useMapAssets";
import { saveHistoryAtom } from "../useHistory";
import { selectedElementAtom } from "./useSelectedElem";
import { useSetAtom } from "jotai";

export const removeElementAtom = atom(null, (get, set, id: MaybeGUID) => {
    const removeElement = (id: MaybeGUID) => {
        console.log("Removed " + id);
        elementFamilyAtom.remove(id);
        set(selectedElementAtom, undefined);
        set(selectedColliderIDAtom, undefined);
        set(elementsAtom, get(elementsAtom).filter((elem) => elem.id !== id));

        const childIDs = get(elementChildrenFamilyAtom(id));
        childIDs.forEach((childID) => {
            removeElement(childID);
        });
    };
    removeElement(id);
    set(trimAssetsAtom);
    set(saveHistoryAtom);
});

export const removeSelectedElementAtom = atom(null, (get, set) => {
    const selectedElem = get(selectedElementAtom);
    if (selectedElem)
        set(removeElementAtom, selectedElem.id);
});

// Debug
removeElementAtom.debugLabel = "removeElementAtom";
removeSelectedElementAtom.debugLabel = "removeSelectedElementAtom";

// Hooks
export function useRemoveElement() {
    return useSetAtom(removeElementAtom);
}

export function useRemoveSelectedElement() {
    return useSetAtom(removeSelectedElementAtom);
}