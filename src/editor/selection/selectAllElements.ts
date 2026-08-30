import store from "../../shared/store";
import {allElementsAtom} from "../document/documentStore";
import {selectedElementIDsAtom} from "./stores/elementSelectionStore";

export const selectAllElements = () => {
    const allElements = store.get(allElementsAtom);
    const allElementIDs = allElements.map(elem => elem.id);
    store.set(selectedElementIDsAtom, allElementIDs);
};