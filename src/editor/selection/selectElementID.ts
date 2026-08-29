import {MaybeGUID} from "@/types/common/GUID";
import store from "../../shared/store";
import SelectOperation from "../../types/common/SelectOperation";
import {selectedElementIDsAtom} from "./stores/elementSelectionStore";

import {elementAtomFamily} from "../documentStore";

const selectElementID = (
    id: MaybeGUID,
    operation: SelectOperation = "set"
) => {
    let selectedIDs = store.get(selectedElementIDsAtom);

    // If no id is provided, clear the selection
    if (id === undefined)
        selectedIDs = [];

    // Add to selection
    else if (operation === "add")
        selectedIDs = Array.from(new Set([...selectedIDs, id]));

    // Remove from selection
    else if (operation === "remove")
        selectedIDs = selectedIDs.filter((selectedID) => selectedID !== id);

    // Set selection to a single id
    else if (operation === "set")
        selectedIDs = [id];

    // Toggle selection
    else if (operation === "toggle") {
        if (selectedIDs.includes(id))
            selectedIDs = selectedIDs.filter((selectedID) => selectedID !== id);
        else
            selectedIDs = [...selectedIDs, id];
    }

    // Invalid operation
    else
        console.warn("Invalid operation for selectElementIDAtom:", operation);

    // Remove any children IDs from the selection
    // TODO: Remove this when we have a better way to drag children of selected elements
    const getParentInSelection = (id: MaybeGUID) => {
        // Get the current element
        const element = store.get(elementAtomFamily(id));
        if (!element)
            return;

        // Check if this element's parent ID is in the new selection
        if (element.parentID && selectedIDs.includes(element.parentID))
            return true;

        // Recursively check parent IDs
        return getParentInSelection(element.parentID);
    };

    selectedIDs = selectedIDs.filter((id) => !getParentInSelection(id));

    // Set the new selection
    store.set(selectedElementIDsAtom, [...selectedIDs]);
};
export default selectElementID;