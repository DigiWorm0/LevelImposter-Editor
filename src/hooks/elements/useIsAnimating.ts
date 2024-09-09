import {atom, useAtomValue} from "jotai";
import GUID, {MaybeGUID} from "../../types/generic/GUID";
import {atomFamily} from "jotai/utils";
import {selectedElementPropAtom} from "./useSelectedElemProperty";
import LIAnimTarget from "../../types/li/LIAnimTarget";
import {elementChildIDsAtomFamily} from "./useElementChildIDs";

export const isAnimatingAtomFamily = atomFamily((elementID: GUID) => {
    return atom((get) => {
        const animTargets = get(selectedElementPropAtom("animTargets")) as LIAnimTarget[];
        if (!animTargets)
            return false;

        const checkTarget = (id: MaybeGUID): boolean => {
            if (id === elementID)
                return true;

            const childIDs = get(elementChildIDsAtomFamily(id));
            if (!childIDs)
                return false;

            return childIDs.some((childID) => checkTarget(childID));
        };

        return animTargets.some((target) => checkTarget(target.id));
    });
});

export default function useIsAnimating(elementID: GUID) {
    return useAtomValue(isAnimatingAtomFamily(elementID));
}