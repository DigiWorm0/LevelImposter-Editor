import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {MaybeGUID} from "@shared/types/GUID";
import {selectedElementPropAtom} from "../../../hooks/elements/useSelectedElemProperty";
import LIAnimTarget from "../../../types/li/LIAnimTarget";
import {selectedElementTypeAtom} from "@editor/selection/stores/elementSelectionStore";

export const isAnimTargetAtom = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        // Check if the ID is valid
        if (!id)
            return false;

        // Check if selected element is a Trigger Animation
        const elemType = get(selectedElementTypeAtom);
        if (elemType !== "util-triggeranim")
            return false;

        // Check if the ID is a trigger target in the selected Trigger Animation
        const animTargets = get(selectedElementPropAtom("animTargets")) as LIAnimTarget[] | undefined;
        return animTargets?.some(at => at.id === id) || false;
    });
});

export default function useIsAnimTarget(id: MaybeGUID) {
    return useAtomValue(isAnimTargetAtom(id));
}