import {atom, useSetAtom} from "jotai";
import {selectedColliderIDAtom} from "../elements/colliders/useSelectedCollider";
import {selectedElementIDsAtom} from "../selection/useSelectedElementIDs";
import {selectedColliderPointIndexesAtom} from "../elements/colliders/useSelectedColliderPointIndexes";

export const deselectAllAtom = atom(null, (get, set) => {
    // Deselect the collider point indexes
    const selectedColliderID = get(selectedColliderIDAtom);
    if (selectedColliderID !== undefined) {
        set(selectedColliderPointIndexesAtom, []);
        return;
    }

    // Deselect the selected element
    set(selectedElementIDsAtom, []);
});
deselectAllAtom.debugLabel = "deselectAllAtom";

export default function useDeselectAll() {
    return useSetAtom(deselectAllAtom);
}