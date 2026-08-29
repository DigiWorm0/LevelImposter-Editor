import store from "../../shared/store";
import {allElementsAtom} from "../documentStore";
import {selectedElementIDsAtom} from "./stores/elementSelectionStore";

export const selectAllElements = () => {
    const allElements = store.get(allElementsAtom);
    const allElementIDs = allElements.map(elem => elem.id);
    store.set(selectedElementIDsAtom, allElementIDs);
};