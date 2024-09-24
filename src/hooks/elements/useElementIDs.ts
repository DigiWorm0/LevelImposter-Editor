import { atom, useAtomValue } from "jotai";
import { elementsAtom } from "../map/useMap";
import GUID from "../../types/generic/GUID";
import compareArrays from "../../utils/math/compareArrays";

let prevElementIDs: GUID[] = [];
export const elementIDsAtom = atom((get) => {
    const elementIDs = get(elementsAtom).map((e) => e.id);

    // Only update if elementIDs have changed
    if (!compareArrays(prevElementIDs, elementIDs))
        prevElementIDs = elementIDs;

    return elementIDs;
});


export default function useElementIDs() {
    return useAtomValue(elementIDsAtom);
}