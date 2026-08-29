import {atom} from "jotai";
import GUID, {MaybeGUID} from "../../../types/common/GUID";
import {atomFamily} from "jotai/utils";
import {isElementSelectedAtomFamily} from "@/hooks/elements/useIsElementSelected";

import {elementAtomFamily} from "../../documentStore";

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

export const isElementIDSelectedAtomFamily = atomFamily((id: MaybeGUID) => atom((get) => {
    const searchParent = (childID: MaybeGUID) => {
        if (childID === undefined)
            return false;
        if (get(isElementSelectedAtomFamily(childID)))
            return true;
        const parentID = get(elementAtomFamily(childID))?.parentID;
        return searchParent(parentID);
    };

    return searchParent(id);
}));

export const selectedElementTypeAtom = atom((get) => get(selectedElementAtom)?.type);