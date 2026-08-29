import {selectedColliderIDAtom, selectedColliderPointIndicesAtom} from "./stores/colliderSelectionStore";
import store from "../../shared/store";
import {selectedElementIDsAtom} from "./stores/elementSelectionStore";

export const deselectAll = () => {
    // Deselect the collider point indexes
    const selectedColliderID = store.get(selectedColliderIDAtom);
    if (selectedColliderID !== undefined) {
        store.set(selectedColliderPointIndicesAtom, []);
        return;
    }

    // Deselect the selected elements
    store.set(selectedElementIDsAtom, []);
};