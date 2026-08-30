import {atom, useAtomValue} from "jotai";
import GUID from "../../types/common/GUID";
import compareArrays from "../../utils/common/compareArrays";

import {documentAtom} from "@editor/document/documentStore";

let prevElementIDs: GUID[] = [];
export const elementIDsAtom = atom((get) => {
    const currentDocument = get(documentAtom);
    const elementIDs = Object.keys(currentDocument.elements) as GUID[];

    // Only update if elementIDs have changed
    if (!compareArrays(prevElementIDs, elementIDs))
        prevElementIDs = elementIDs;

    return elementIDs;
});


export default function useElementIDs() {
    return useAtomValue(elementIDsAtom);
}