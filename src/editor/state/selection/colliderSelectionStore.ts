import {atom} from "jotai";
import {MaybeGUID} from "../../../types/common/GUID";
import {atomFamily} from "jotai/utils";
import {selectedElementAtom} from "./elementSelectionStore";

export const selectedColliderIDAtom = atom<MaybeGUID>(undefined);
export const selectedColliderPointIndicesAtom = atom<number[]>([]);

// Computed Atoms
export const colliderAtomFamily = atomFamily((id: MaybeGUID) => atom((get) => {
    const selectedElem = get(selectedElementAtom);
    return selectedElem?.properties.colliders?.find(c => c.id === id);
}));
export const selectedColliderAtom = atom((get) => {
    const selectedColliderID = get(selectedColliderIDAtom);
    return get(colliderAtomFamily(selectedColliderID));
});
export const isColliderSelectedAtom = atom((get) => {
    const selectedElem = get(selectedElementAtom);
    const selectedColliderID = get(selectedColliderIDAtom);
    if (!selectedElem || !selectedColliderID)
        return false;

    const collider = selectedElem.properties.colliders?.find(c => c.id === selectedColliderID);
    return collider !== undefined;
});