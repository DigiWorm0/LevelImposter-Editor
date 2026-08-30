import {EditorCommand} from "../../history/executeCommand";
import store from "../../../shared/store";
import {isColliderSelectedAtom, selectedColliderPointIndicesAtom} from "../stores/colliderSelectionStore";
import {getSelectedCollider} from "@editor/elements/colliders/getSelectedCollider";
import {deleteSelectedElements} from "@editor/elements/deleteElement";

export const deleteAnythingSelected = (): EditorCommand => map => {
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