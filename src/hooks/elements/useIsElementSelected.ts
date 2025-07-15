import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/generic/GUID";
import {selectedElementIDsAtom} from "../selection/useSelectedElementIDs";

export const isElementSelectedAtomFamily = atomFamily((id?: MaybeGUID) => {
    return atom((get) => {
        // Check if any element is selected
        if (id === undefined)
            return get(selectedElementIDsAtom).length > 0;

        // Check if the element is selected
        else
            return get(selectedElementIDsAtom).includes(id);
    });
});

export default function useIsElementSelected(id?: MaybeGUID) {
    return useAtomValue(isElementSelectedAtomFamily(id));
}