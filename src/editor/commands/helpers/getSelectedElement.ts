import store from "../../../shared/store";
import {MapDraft} from "../../history/executeCommand";
import {selectedElementIDAtom, selectedElementIDsAtom} from "../../state/selection/elementSelectionStore";

export const getSelectedElement = (map: MapDraft) => {
    const selectedElementID = store.get(selectedElementIDAtom);
    return map.elements.find(e => e.id === selectedElementID) || null;
};

export const getSelectedElements = (map: MapDraft) => {
    const selectedElementIDs = store.get(selectedElementIDsAtom);
    return map.elements.filter(e => selectedElementIDs.includes(e.id));
};