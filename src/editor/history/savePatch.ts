import store from "../../shared/store";
import {allPatchesAtom, enableHistoryAtom, PatchEntry, patchHeadIndexAtom} from "../state/historyStore";

const MAX_HISTORY_LENGTH = 100;

export default function savePatch(newEntry: PatchEntry) {
    if (!store.get(enableHistoryAtom))
        return;

    // Get current state
    const history = store.get(allPatchesAtom);
    const headIndex = store.get(patchHeadIndexAtom);

    // Remove future history
    if (headIndex < history.length - 1)
        history.splice(headIndex + 1, history.length - headIndex - 1);

    // Add the new entry
    history.push(newEntry);

    // Remove old history
    if (history.length > MAX_HISTORY_LENGTH)
        history.shift();

    // Update atoms
    store.set(allPatchesAtom, [...history]);
    store.set(patchHeadIndexAtom, history.length - 1);
}