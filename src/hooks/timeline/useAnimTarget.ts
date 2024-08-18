import {MaybeGUID} from "../../types/generic/GUID";
import {atomFamily} from "jotai/utils";
import {atom, useAtom} from "jotai";
import LIAnimTarget from "../../types/li/LIAnimTarget";
import {selectedElementPropAtom} from "../elements/useSelectedElemProperty";

export const animTargetAtomFamily = atomFamily((id: MaybeGUID) => {
    const animTargetsAtom = selectedElementPropAtom("animTargets");
    return atom((get) => {
        if (!id)
            return null;

        // Get the current targets
        const animTargets = get(animTargetsAtom) as LIAnimTarget[];
        if (!animTargets)
            return null;

        // Find the target
        return animTargets.find((t) => t.id === id);
    }, (get, set, update: LIAnimTarget) => {
        if (!id)
            return;

        // Get the current targets
        const animTargets = get(animTargetsAtom) as LIAnimTarget[];
        if (!animTargets)
            return;

        // Find the target index
        const index = animTargets.findIndex((t) => t.id === id);
        if (index === -1)
            return;

        // Update the target at index
        const newAnimTargets = [...animTargets];
        newAnimTargets[index] = update;
        set(animTargetsAtom, newAnimTargets);
    });
});

export default function useAnimTarget(id: MaybeGUID) {
    return useAtom(animTargetAtomFamily(id));
}