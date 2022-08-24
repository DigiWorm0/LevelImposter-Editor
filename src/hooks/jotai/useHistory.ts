import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { historyAtom, saveHistoryAtom, undoHistoryAtom } from "./Jotai";


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