import store from "../../shared/store";
import {allElementsAtom} from "../state/documentStore";
import {selectedElementIDsAtom} from "../state/selection/elementSelectionStore";

export const selectAllElements = () => {
    const allElements = store.get(allElementsAtom);
    const allElementIDs = allElements.map(elem => elem.id);
    store.set(selectedElementIDsAtom, allElementIDs);
};