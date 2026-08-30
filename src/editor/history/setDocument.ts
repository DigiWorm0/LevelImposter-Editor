import store from "@/shared/store";
import {documentAtom, isDocSavedAtom} from "@editor/document/documentStore";
import {allPatchesAtom} from "@editor/history/historyStore";
import {MapDocument} from "@editor/document/types/MapDocument";

export const setDocument = (newDocument: MapDocument) => {
    store.set(documentAtom, newDocument);
    store.set(allPatchesAtom, []);
    store.set(isDocSavedAtom, true);
};