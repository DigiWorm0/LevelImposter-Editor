import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MAX_HISTORY_LENGTH } from "../../types/generic/Constants";
import LIMap from "../../types/li/LIMap";
import { mapAtom } from "./useMap";
import { selectedColliderIDAtom } from "./useSelectedCollider";
import { selectedElementIDAtom } from "./useSelectedElem";

// Atoms
export const historyAtom = atom<LIMap[]>([]);
export const saveHistoryAtom = atom(null, (get, set) => {
    const history = get(historyAtom);
    const current = get(mapAtom);
    history.push({ ...current, elements: [...current.elements] });
    if (history.length > MAX_HISTORY_LENGTH)
        history.shift();
    set(historyAtom, [...history]);
});
export const undoHistoryAtom = atom(null, (get, set) => {
    const history = get(historyAtom);
    if (history.length > 0) {
        const current = history[history.length - 1];
        set(mapAtom, current);
        history.pop();
        set(historyAtom, [...history]);

        const selectedID = get(selectedElementIDAtom);
        if (selectedID && !current.elements.find(e => e.id === selectedID)) {
            set(selectedElementIDAtom, undefined);
            set(selectedColliderIDAtom, undefined);
        }
    }
    else {
        console.warn("No more history to undo");
    }
});

// Debug
historyAtom.debugLabel = "history";
saveHistoryAtom.debugLabel = "saveHistory";
undoHistoryAtom.debugLabel = "undoHistory";

// Hooks
export default function useHistory() {
    return useAtom(historyAtom);
}
export function useSetHistory() {
    return useSetAtom(historyAtom);
}
export function useHistoryValue() {
    return useAtomValue(historyAtom);
}

export function useUndo() {
    return useSetAtom(undoHistoryAtom);
}
export function useSaveHistory() {
    return useSetAtom(saveHistoryAtom);
}