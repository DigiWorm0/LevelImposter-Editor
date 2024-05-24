import { atom, useSetAtom } from "jotai";
import { selectedElementIDAtom } from "./elements/useSelectedElem";
import { selectedColliderIDAtom } from "./elements/colliders/useSelectedCollider";

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