import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {MaybeGUID} from "../../../types/common/GUID";
import LICollider from "../../../types/li/LICollider";
import {colliderAtomFamily} from "./useCollider";
import {selectedElementAtom} from "../useSelectedElem";

// Atoms
export const selectedColliderIDAtom = atom<MaybeGUID>(undefined);
export const selectedColliderAtom = atom(
    (get) => {
        const selectedColliderID = get(selectedColliderIDAtom);
        return get(colliderAtomFamily(selectedColliderID));
    },
    (get, set, collider: LICollider) => {
        const selectedColliderID = get(selectedColliderIDAtom);
        set(colliderAtomFamily(selectedColliderID), collider);
    }
);
export const isSelectedColliderAtom = atom(
    (get) => {
        const selectedElem = get(selectedElementAtom);
        const selectedColliderID = get(selectedColliderIDAtom);
        if (!selectedElem || !selectedColliderID)
            return false;

        const collider = selectedElem.properties.colliders?.find(c => c.id === selectedColliderID);
        return collider !== undefined;
    }
);

// Hooks
export function useSelectedColliderID() {
    return useAtom(selectedColliderIDAtom);
}

export function useSetSelectedColliderID() {
    return useSetAtom(selectedColliderIDAtom);
}

export function useSelectedColliderIDValue() {
    return useAtomValue(selectedColliderIDAtom);
}

export default function useSelectedCollider() {
    return useAtom(selectedColliderAtom);
}

export function useSetSelectedCollider() {
    return useSetAtom(selectedColliderAtom);
}

export function useSelectedColliderValue() {
    return useAtomValue(selectedColliderAtom);
}

export function useIsSelectedCollider() {
    return useAtomValue(isSelectedColliderAtom);
}