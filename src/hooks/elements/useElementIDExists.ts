import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/types/common/GUID";
import {atom, useAtomValue} from "jotai";
import {docElementsAtom} from "@editor/document/documentStore";

export const elementIDExistsAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        if (!id)
            return false;

        return id in get(docElementsAtom);
    });
});

/**
 * Returns whether an element with the given ID exists.
 * @param id The ID of the element to check.
 */
export default function useElementIDExists(id: MaybeGUID) {
    return useAtomValue(elementIDExistsAtomFamily(id));
}