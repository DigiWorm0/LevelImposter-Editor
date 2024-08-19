import {selectedElementPropAtom} from "../elements/useSelectedElemProperty";
import LIAnimTarget from "../../types/li/LIAnimTarget";
import {atom, useAtomValue} from "jotai";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";

export const animDurationAtom = atom((get) => {
    // Get selected element anim targets
    const animTargets = get(selectedElementPropAtom("animTargets")) as LIAnimTarget[];
    if (!animTargets)
        return 0;

    // Default duration
    let maxDuration = 0;

    // Iterate through targets
    for (const animTarget of animTargets) {

        // Iterate through properties
        for (const property in animTarget.properties) {
            const propertyData = animTarget.properties[property as LIAnimPropertyType];

            // Iterate through keyframes
            for (const keyframe of propertyData.keyframes) {
                maxDuration = Math.max(maxDuration, keyframe.t);
            }
        }
    }

    return maxDuration;
});

export default function useAnimDuration() {
    return useAtomValue(animDurationAtom);
}