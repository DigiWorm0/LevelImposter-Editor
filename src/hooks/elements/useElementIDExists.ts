import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import { atom, useAtomValue } from "jotai";
import { mapAtom } from "../map/useMap";

export const elementIDExistsAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        if (!id)
            return false;

        const map = get(mapAtom);
        const elem = map.elements.find((e) => e.id === id);
        return !!elem;
    });
});

/**
 * Returns whether an element with the given ID exists.
 * @param id The ID of the element to check.
 */
export default function useElementIDExists(id: MaybeGUID) {
    return useAtomValue(elementIDExistsAtomFamily(id));
}