import {atom, useSetAtom} from "jotai";
import GUID from "../../types/generic/GUID";
import {selectedElementPropAtom} from "../elements/useSelectedElemProperty";
import LIAnimTarget from "../../types/li/LIAnimTarget";

export const addAnimTargetAtom = atom(null, (get, set, targetID: GUID) => {

    // Get AnimTargets
    const animTargetsAtom = selectedElementPropAtom("animTargets");
    const animTargets = get(animTargetsAtom) as LIAnimTarget[];

    // Add the target to the list
    set(animTargetsAtom, [
        ...(animTargets ?? []),
        {id: targetID, properties: {}}
    ]);
});

export default function useAddAnimTarget() {
    return useSetAtom(addAnimTargetAtom);
}