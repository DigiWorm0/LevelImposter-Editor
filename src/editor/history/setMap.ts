import LIMap from "@/types/li/LIMap";
import store from "@/shared/store";
import {isDocumentSavedAtom, mapAtom} from "@editor/documentStore";
import {allPatchesAtom} from "@editor/history/historyStore";

export const setMap = (newMap: LIMap) => {
    store.set(mapAtom, newMap);
    store.set(allPatchesAtom, []);
    store.set(isDocumentSavedAtom, true);
};