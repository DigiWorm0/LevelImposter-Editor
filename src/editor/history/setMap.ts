import LIMap from "@/types/li/LIMap";
import store from "@/shared/store";
import {isDocumentSavedAtom, mapAtom} from "@editor/state/documentStore";
import {allPatchesAtom} from "@editor/state/historyStore";

export const setMap = (newMap: LIMap) => {
    store.set(mapAtom, newMap);
    store.set(allPatchesAtom, []);
    store.set(isDocumentSavedAtom, true);
};