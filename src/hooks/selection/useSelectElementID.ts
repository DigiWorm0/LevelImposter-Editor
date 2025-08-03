import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";
import {selectedElementIDsAtom} from "./useSelectedElementIDs";
import {elementAtomFamily} from "../elements/useElements";

export interface SelectElementIDParams {
    id: MaybeGUID;
    operation: "add" | "remove" | "toggle" | "set";
}

export const selectElementIDAtom = atom(null, (get, set, params: SelectElementIDParams) => {
    const selectedIDs = get(selectedElementIDsAtom);
    const {id, operation} = params;

    let newSelectedIDs = [...selectedIDs];

    // If no id is provided, clear the selection
    if (id === undefined)
        newSelectedIDs = [];

    // Add to selection
    else if (operation === "add")
        newSelectedIDs = Array.from(new Set([...selectedIDs, id]));

    // Remove from selection
    else if (operation === "remove")
        newSelectedIDs = selectedIDs.filter((selectedID) => selectedID !== id);

    // Set selection to a single id
    else if (operation === "set")
        newSelectedIDs = [id];

    // Toggle selection
    else if (operation === "toggle") {
        if (selectedIDs.includes(id))
            newSelectedIDs = selectedIDs.filter((selectedID) => selectedID !== id);
        else
            newSelectedIDs = [...selectedIDs, id];
    }

    // Invalid operation
    else
        console.warn("Invalid operation for selectElementIDAtom:", operation);

    // Remove any children IDs from the selection
    // TODO: Remove this when we have a better way to drag children of selected elements
    const getParentInSelection = (id: MaybeGUID) => {
        // Get the current element
        const element = get(elementAtomFamily(id));
        if (!element)
            return;

        // Check if this element's parent ID is in the new selection
        if (element.parentID && newSelectedIDs.includes(element.parentID))
            return true;

        // Recursively check parent IDs
        return getParentInSelection(element.parentID);
    };

    newSelectedIDs = newSelectedIDs.filter((id) => !getParentInSelection(id));

    // Set the new selection
    set(selectedElementIDsAtom, newSelectedIDs);
});

export default function useSelectElementID() {
    return useSetAtom(selectElementIDAtom);
}