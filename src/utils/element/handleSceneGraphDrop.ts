import {MaybeGUID} from "../../types/common/GUID";
import primaryStore from "../../hooks/primaryStore";
import {draggingElementIDAtom} from "../../hooks/elements/dragging/useDraggingElementID";
import {elementChildIDsAtomFamily} from "../../hooks/elements/useElementChildIDs";
import {selectedElementIDsAtom} from "../../editor/state/selection/elementSelectionStore";
import executeCommand from "../../editor/history/executeCommand";

/**
 * Handle dragging and dropping an element in the scene graph.
 * @param targetElementID - ID of the element that is being dropped onto (undefined if dropped onto origin)
 */
export default function handleSceneGraphDrop(targetElementID: MaybeGUID) {
    const draggingElementID = primaryStore.get(draggingElementIDAtom);
    const selectedElementIDs = primaryStore.get(selectedElementIDsAtom);

    // If there is no dragging element, do nothing
    if (!draggingElementID)
        return;

    // If multiple elements are selected, and the dragging element is one of them,
    // we will move all selected elements under the target element
    const isDraggingElementSelected = selectedElementIDs.includes(draggingElementID);
    let elementIDsToMove = isDraggingElementSelected ? selectedElementIDs : [draggingElementID];

    // If target is a child of any element being moved, do nothing to avoid circular hierarchy
    // (Recursive check)
    function isTargetChildOfElement(elementID: MaybeGUID): boolean {

        // Base case: if elementID matches targetElementID
        if (targetElementID === elementID)
            return true;

        // Get children of the element
        const childIDs = primaryStore.get(elementChildIDsAtomFamily(elementID));
        for (const childID of childIDs) {
            if (isTargetChildOfElement(childID))
                return true;
        }

        return false;
    }

    elementIDsToMove = elementIDsToMove.filter(id => !isTargetChildOfElement(id));

    // Move each element under the target element
    executeCommand(map => {
        for (const id of elementIDsToMove) {
            // Get the element data
            const element = map.elements.find(e => e.id === id);
            if (!element)
                return;

            // Update the parentID of the element to the target elementID
            element.parentID = targetElementID;
        }
    });
}