import {atom, useSetAtom} from "jotai";
import {isSelectedColliderAtom, selectedColliderAtom} from "../elements/colliders/useSelectedCollider";
import {selectedColliderPointIndexesAtom} from "../elements/colliders/useSelectedColliderPointIndexes";
import {removeSelectedElementAtom} from "../elements/useRemoveElement";

const deleteSelectedAtom = atom(null, async (get, set) => {
    const isColliderSelected = get(isSelectedColliderAtom);
    if (isColliderSelected) {
        // Delete selected collider points
        const selectedIndices = get(selectedColliderPointIndexesAtom);
        const selectedCollider = get(selectedColliderAtom);
        if (!selectedCollider)
            return;

        // Filter out points at selected indices
        const newPoints = selectedCollider.points.filter((_, index) => !selectedIndices.includes(index));

        // Update collider points
        set(selectedColliderAtom, {
            ...selectedCollider,
            points: newPoints
        });

        return;
    }

    // Delete selected element
    set(removeSelectedElementAtom);
});

export default function useDeleteSelected() {
    return useSetAtom(deleteSelectedAtom);
}