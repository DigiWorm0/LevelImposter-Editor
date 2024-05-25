import { atom, useAtomValue } from "jotai";
import { selectedElementIDAtom } from "./useSelectedElem";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";

export const isElementSelectedAtomFamily = atomFamily((id?: MaybeGUID) => {
    return atom((get) => {
        // Check if any element is selected
        if (id === undefined)
            return get(selectedElementIDAtom) !== undefined;

        // Check if the element is selected
        else
            return get(selectedElementIDAtom) === id;
    });
});

export default function useIsElementSelected(id?: MaybeGUID) {
    return useAtomValue(isElementSelectedAtomFamily(id));
}