import store from "../../shared/store";
import {documentAtom} from "../document/documentStore";
import {selectedElementIDsAtom} from "./stores/elementSelectionStore";
import GUID from "@shared/types/GUID";

export const selectAllElements = () => {
    const currentDocument = store.get(documentAtom);
    const allElementIDs = Object.keys(currentDocument.elements) as GUID[];
    store.set(selectedElementIDsAtom, allElementIDs);
};