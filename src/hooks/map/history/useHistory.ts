import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MAX_HISTORY_LENGTH } from "../../../types/generic/Constants";
import LIMap from "../../../types/li/LIMap";
import { mapAtom } from "../useMap";

// Atoms
export const historyAtom = atom<LIMap[]>([]);
export const headIndexAtom = atom<number>(0);
export const saveHistoryAtom = atom(null, (get, set) => {

    // Get current state
    const history = get(historyAtom);
    const headIndex = get(headIndexAtom);
    const current = get(mapAtom);

    // Remove future history
    if (headIndex < history.length - 1)
        history.splice(headIndex + 1, history.length - headIndex - 1);

    // Save current map state
    // TODO: Clone current to prevent lingering references
    history.push(current);

    // Remove old history
    if (history.length > MAX_HISTORY_LENGTH)
        history.shift();

    // Update atoms
    set(historyAtom, [...history]);
    set(headIndexAtom, history.length - 1);
});

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

export function useSaveHistory() {
    return useSetAtom(saveHistoryAtom);
}