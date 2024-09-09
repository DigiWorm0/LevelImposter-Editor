import {atom, useAtomValue} from "jotai/index";
import {atomFamily} from "jotai/utils";
import GUID, {MaybeGUID} from "../../types/generic/GUID";
import {elementsAtom} from "../map/useMap";
import compareArrays from "../../utils/math/compareArrays";

export const elementChildIDsAtomFamily = atomFamily((id: MaybeGUID) => {
    let prevValue: GUID[] = [];
    return atom(
        (get) => {
            const elements = get(elementsAtom);
            const filteredValues = elements.filter(elem => elem.parentID === id).map((elem) => elem.id);

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