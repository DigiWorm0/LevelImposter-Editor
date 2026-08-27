import {Patch} from "immer";
import {atom} from "jotai";

export interface PatchEntry {
    patches: Patch[];
    inversePatches: Patch[];
}

export const allPatchesAtom = atom<PatchEntry[]>([]);
export const patchHeadIndexAtom = atom<number>(0);
export const enableHistoryAtom = atom<boolean>(true);

// Computed Atoms
export const canUndoAtom = atom(get => get(patchHeadIndexAtom) > 0);
export const canRedoAtom = atom(get => get(patchHeadIndexAtom) < get(allPatchesAtom).length - 1);