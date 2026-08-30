import store from "../../shared/store";
import {DocDraft} from "../history/executeCommand";
import {selectedElementIDAtom, selectedElementIDsAtom} from "../selection/stores/elementSelectionStore";

export const getSelectedElement = (map: DocDraft) => {
    const selectedElementID = store.get(selectedElementIDAtom);
    if (!selectedElementID)
        return null;

    return map.elements[selectedElementID] || null;
};

export const getSelectedElements = (map: DocDraft) => {
    const selectedElementIDs = store.get(selectedElementIDsAtom);
    return selectedElementIDs
        .map(id => map.elements[id] || null)
        .filter(e => e !== null);
};