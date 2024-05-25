import { atom } from "jotai";
import { useSetAtom } from "jotai/index";
import { atomFamily } from "jotai/utils";
import { selectedColliderIDAtom } from "../../elements/colliders/useSelectedCollider";
import { selectedElementIDAtom } from "../../elements/useSelectedElem";
import { mapAtom } from "../useMap";
import { headIndexAtom, historyAtom } from "./useHistory";

const undoRedoAtomFamily = atomFamily((delta: number) => {
    return atom(null, (get, set) => {
        const history = get(historyAtom);
        const headIndex = get(headIndexAtom) + delta;

        if (headIndex < 0 || headIndex >= history.length)
            return;

        const current = history[headIndex];

        set(mapAtom, current);
        set(headIndexAtom, headIndex);
        set(historyAtom, [...history]);

        const selectedID = get(selectedElementIDAtom);
        if (selectedID && !current.elements.find(e => e.id === selectedID)) {
            set(selectedElementIDAtom, undefined);
            set(selectedColliderIDAtom, undefined);
        }
    });
});
export const undoHistoryAtom = undoRedoAtomFamily(-1);
export const redoHistoryAtom = undoRedoAtomFamily(1);

export function useUndo() {
    return useSetAtom(undoHistoryAtom);
}

export function useRedo() {
    return useSetAtom(redoHistoryAtom);
}