import { atom, useSetAtom } from "jotai";
import { MaybeGUID } from "../../../types/generic/GUID";
import { selectedElementAtom } from "../useSelectedElem";

export const deleteColliderAtom = atom(null, (get, set, colliderID: MaybeGUID) => {
    if (!colliderID)
        return;

    const selectedElem = get(selectedElementAtom);
    if (!selectedElem)
        return;

    const filteredColliders = selectedElem.properties.colliders?.filter(c => c.id !== colliderID);
    set(selectedElementAtom, {
        ...selectedElem,
        properties: {
            ...selectedElem.properties,
            colliders: filteredColliders
        }
    });
});

export default function useDeleteCollider() {
    return useSetAtom(deleteColliderAtom);
}