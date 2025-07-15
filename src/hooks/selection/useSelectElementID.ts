import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/generic/GUID";
import {selectedElementIDsAtom} from "./useSelectedElementIDs";

export interface SelectElementIDParams {
    id: MaybeGUID;
    operation: "add" | "remove" | "toggle" | "set";
}

export const selectElementIDAtom = atom(null, (get, set, params: SelectElementIDParams) => {
    const selectedIDs = get(selectedElementIDsAtom);
    const {id, operation} = params;

    // If no id is provided, clear the selection
    if (id === undefined)
        set(selectedElementIDsAtom, []);

    // Add to selection
    else if (operation === "add")
        set(selectedElementIDsAtom, Array.from(new Set([...selectedIDs, id])));

    // Remove from selection
    else if (operation === "remove")
        set(selectedElementIDsAtom, selectedIDs.filter((selectedID) => selectedID !== id));

    // Set selection to a single id
    else if (operation === "set")
        set(selectedElementIDsAtom, [id]);

    // Toggle selection
    else if (operation === "toggle") {
        if (selectedIDs.includes(id))
            set(selectedElementIDsAtom, selectedIDs.filter((selectedID) => selectedID !== id));
        else
            set(selectedElementIDsAtom, [...selectedIDs, id]);
    }

    // Invalid operation
    else
        console.warn("Invalid operation for selectElementIDAtom:", operation);
});

export default function useSelectElementID() {
    return useSetAtom(selectElementIDAtom);
}