import {MapCommand} from "../history/executeCommand";
import store from "../../shared/store";
import {isColliderSelectedAtom, selectedColliderPointIndicesAtom} from "../state/selection/colliderSelectionStore";
import {getSelectedCollider} from "./helpers/getSelectedCollider";
import {deleteSelectedElements} from "./elements/deleteElement";

export const deleteAnythingSelected = (): MapCommand => map => {
    const isColliderSelected = store.get(isColliderSelectedAtom);
    if (isColliderSelected) {
        // Delete selected collider points
        const selectedIndices = store.get(selectedColliderPointIndicesAtom);
        const collider = getSelectedCollider(map);
        if (!collider)
            return;

        // Filter out points at selected indices
        collider.points = collider.points.filter((_, index) => !selectedIndices.includes(index));
        return;
    }

    // Delete selected element
    deleteSelectedElements()(map);
};