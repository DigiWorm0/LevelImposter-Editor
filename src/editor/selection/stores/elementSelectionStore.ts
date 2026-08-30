import {atom} from "jotai";
import GUID from "@shared/types/GUID";


import {elementAtomFamily} from "@/hooks/elements/useElement";

export const selectedElementIDsAtom = atom<GUID[]>([]);

// Computed Atoms
export const selectedElementIDAtom = atom((get) => {
    const selectedIDs = get(selectedElementIDsAtom);
    return selectedIDs.length === 1 ? selectedIDs[0] : undefined;
});
export const selectedElementAtom = atom((get) => {
    const id = get(selectedElementIDAtom);
    if (id === undefined)
        return undefined;

    const elemAtom = elementAtomFamily(id);
    return get(elemAtom);
});
export const selectedElementsAtom = atom((get) => {
    const ids = get(selectedElementIDsAtom);
    return ids
        .map(id => get(elementAtomFamily(id)))
        .filter(e => e !== undefined);
});

export const selectedElementTypeAtom = atom((get) => get(selectedElementAtom)?.type);