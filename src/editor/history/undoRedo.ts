import store from "../../shared/store";
import {allPatchesAtom, patchHeadIndexAtom} from "./historyStore";
import {documentAtom} from "../document/documentStore";
import {applyPatches} from "immer";

export function undo() {
    movePatchHead("undo");
}

export function redo() {
    movePatchHead("redo");
}

/**
 * Moves the patch head one forward or backward in history.
 * If the patch head is at the beginning or end of the history, it does nothing.
 * @param action - "undo" to move backward, "redo" to move forward.
 */
function movePatchHead(action: "undo" | "redo") {
    const allPatches = store.get(allPatchesAtom);
    const patchHeadIndex = store.get(patchHeadIndexAtom);
    const headDelta = action === "undo" ? -1 : 1;
    if (patchHeadIndex + headDelta < 0 ||
        patchHeadIndex + headDelta >= allPatches.length)
        return;

    const currentPatch = allPatches[patchHeadIndex];
    const currentDocument = store.get(documentAtom);

    const nextDocument = applyPatches(
        currentDocument,
        action === "undo" ? currentPatch.inversePatches : currentPatch.patches,
    );

    store.set(patchHeadIndexAtom, patchHeadIndex + headDelta);
    store.set(documentAtom, nextDocument);
}