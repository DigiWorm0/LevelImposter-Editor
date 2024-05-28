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

        // Check if we are within bounds
        if (headIndex < 0 || headIndex >= history.length)
            return;

        // Get the new current map
        const current = history[headIndex];

        // Update the map and head index
        set(mapAtom, current);
        set(headIndexAtom, headIndex);

        // Deselect element if it was deleted
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