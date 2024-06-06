import { atom, useSetAtom } from "jotai";
import { MaybeGUID } from "../../../types/generic/GUID";
import { selectedColliderIDAtom } from "./useSelectedCollider";
import { selectedElementPropAtom } from "../useSelectedElemProperty";
import LICollider from "../../../types/li/LICollider";

export const deleteColliderAtom = atom(null, (get, set, colliderID: MaybeGUID) => {
    if (!colliderID)
        return;

    // Get the colliders
    const colliderAtom = selectedElementPropAtom("colliders");
    const colliders = get(colliderAtom) as LICollider[];
    if (!colliders)
        return;

    // Remove the collider
    const filteredColliders = colliders.filter(c => c.id !== colliderID);
    set(colliderAtom, filteredColliders);

    // Unselect the collider
    set(selectedColliderIDAtom, undefined);
});

export default function useDeleteCollider() {
    return useSetAtom(deleteColliderAtom);
}