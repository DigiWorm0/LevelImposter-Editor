import { atom, useAtomValue } from "jotai/index";
import { headIndexAtom, historyAtom } from "./useHistory";

export const canUndoAtom = atom(get => get(headIndexAtom) > 0);
export const canRedoAtom = atom(get => get(headIndexAtom) < get(historyAtom).length - 1);

export function useCanUndo() {
    return useAtomValue(canUndoAtom);
}

export function useCanRedo() {
    return useAtomValue(canRedoAtom);
}