import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import GUID, {MaybeGUID} from "../../shared/types/GUID";
import compareArrays from "@shared/utils/compareArrays";

import {documentAtom} from "@editor/document/documentStore";

export const elementChildIDsAtomFamily = atomFamily((id: MaybeGUID) => {
    let prevValue: GUID[] = [];
    return atom(
        (get) => {
            const currentDocument = get(documentAtom);
            const allElements = Object.values(currentDocument.elements);
            const filteredValues = allElements
                .filter(elem => elem.parentID === id)
                .map((elem) => elem.id);

            // HACK: Only update if the values have changed
            if (!compareArrays(filteredValues, prevValue))
                prevValue = filteredValues;

            return prevValue;
        }
    );
});

export function useElementChildIDs(id: MaybeGUID) {
    return useAtomValue(elementChildIDsAtomFamily(id));
}