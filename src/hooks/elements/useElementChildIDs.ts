import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import GUID, {MaybeGUID} from "../../types/common/GUID";
import {allElementsAtom} from "../../editor/state/documentStore";
import compareArrays from "../../utils/common/compareArrays";

export const elementChildIDsAtomFamily = atomFamily((id: MaybeGUID) => {
    let prevValue: GUID[] = [];
    return atom(
        (get) => {
            const elements = get(allElementsAtom);
            const filteredValues = elements
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