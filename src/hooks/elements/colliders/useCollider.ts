import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../../types/generic/GUID";
import LICollider from "../../../types/li/LICollider";
import { selectedElementAtom } from "../useSelectedElem";

export const colliderAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const selectedElem = get(selectedElementAtom);
        return selectedElem?.properties.colliders?.find(c => c.id === id);
    }, (get, set, collider: LICollider) => {
        const selectedElem = get(selectedElementAtom);
        if (!selectedElem)
            return;

        const colliders = [...(selectedElem.properties.colliders ?? [])];
        const index = colliders.findIndex(c => c.id === id);
        if (index === -1)
            return;

        // Update the collider
        colliders[index] = collider;

        // Update the selected element
        set(selectedElementAtom, {
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                colliders
            }
        });
    });
});

export default function useCollider(id: MaybeGUID) {
    return useAtom(colliderAtomFamily(id));
}

export function useSetCollider(id: MaybeGUID) {
    return useSetAtom(colliderAtomFamily(id));
}

export function useColliderValue(id: MaybeGUID) {
    return useAtomValue(colliderAtomFamily(id));
}