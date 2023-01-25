import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MAX_HISTORY_LENGTH } from "../../types/generic/Constants";
import LIMap from "../../types/li/LIMap";
import { mapAtom } from "./useMap";
import { selectedColliderIDAtom } from "./useSelectedCollider";
import { selectedElementIDAtom } from "./useSelectedElem";

// Atoms
export const historyAtom = atom<LIMap[]>([]);
export const headIndexAtom = atom<number>(0);
export const saveHistoryAtom = atom(null, (get, set) => {
    const history = get(historyAtom);
    const headIndex = get(headIndexAtom);
    const current = get(mapAtom);
    if (headIndex < history.length - 1) {
        history.splice(headIndex + 1, history.length - headIndex - 1);
    }
    history.push({
        ...current,
        elements: current.elements.map(e => ({
            ...e,
            properties: {
                ...e.properties,
            },
        }))
    });
    if (history.length > MAX_HISTORY_LENGTH)
        history.shift();
    set(historyAtom, [...history]);
    set(headIndexAtom, history.length - 1);

    console.log(`Saved undo/redo history: ${history.length}`);
});
export const undoHistoryAtom = atom(null, (get, set) => {
    const history = get(historyAtom);
    const headIndex = get(headIndexAtom);

    if (headIndex > 0) {
        const current = history[headIndex - 1];
        set(mapAtom, {
            ...current,
            elements: current.elements.map(e => ({
                ...e,
                properties: {
                    ...e.properties,
                },
            })),
            properties: {
                ...current.properties,
            },
        });
        set(headIndexAtom, headIndex - 1);
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

export const redoHistoryAtom = atom(null, (get, set) => {
    const history = get(historyAtom);
    const headIndex = get(headIndexAtom);

    if (headIndex < history.length - 1) {
        const current = history[headIndex + 1];
        set(mapAtom, {
            ...current,
            elements: current.elements.map(e => ({
                ...e,
                properties: {
                    ...e.properties,
                },
            })),
            properties: {
                ...current.properties,
            },
        });
        set(headIndexAtom, headIndex + 1);
        set(historyAtom, [...history]);

        const selectedID = get(selectedElementIDAtom);
        if (selectedID && !current.elements.find(e => e.id === selectedID)) {
            set(selectedElementIDAtom, undefined);
            set(selectedColliderIDAtom, undefined);
        }
    }
    else {
        console.warn("No more history to redo");
    }
});

export const canUndoAtom = atom(get => get(headIndexAtom) > 0);
export const canRedoAtom = atom(get => get(headIndexAtom) < get(historyAtom).length - 1);

// Debug
historyAtom.debugLabel = "history";
saveHistoryAtom.debugLabel = "saveHistory";
undoHistoryAtom.debugLabel = "undoHistory";
redoHistoryAtom.debugLabel = "redoHistory";

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
export function useRedo() {
    return useSetAtom(redoHistoryAtom);
}

export function useSaveHistory() {
    return useSetAtom(saveHistoryAtom);
}

export function useCanUndo() {
    return useAtomValue(canUndoAtom);
}
export function useCanRedo() {
    return useAtomValue(canRedoAtom);
}
