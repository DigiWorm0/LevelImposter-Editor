import { atom, useSetAtom } from "jotai";
import { selectedColliderIDAtom } from "../elements/colliders/useSelectedCollider";
import { selectedElementIDAtom } from "../elements/useSelectedElem";

export const deselectAllAtom = atom(null, (get, set) => {
    // Don't deselect if a collider is selected
    const selectedColliderID = get(selectedColliderIDAtom);
    if (selectedColliderID !== undefined)
        return;

    // Deselect the selected element
    set(selectedElementIDAtom, undefined);
});
deselectAllAtom.debugLabel = "deselectAllAtom";

export default function useDeselectAll() {
    return useSetAtom(deselectAllAtom);
}