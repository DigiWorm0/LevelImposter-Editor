import {atom, useSetAtom} from "jotai";
import {selectedKeyframeAtom} from "./useSelectedKeyframe";
import {animTargetAtomFamily} from "./useAnimTarget";

export const removeSelectedKeyframeAtom = atom(null, (get, set) => {

    // Get the selected keyframe
    const selectedKeyframe = get(selectedKeyframeAtom);
    if (!selectedKeyframe)
        return;

    // Get the target
    const animTarget = get(animTargetAtomFamily(selectedKeyframe.targetID));
    if (!animTarget)
        return;

    // Get the property
    const property = animTarget.properties[selectedKeyframe.property];
    if (!property)
        return;

    // Filter the keyframes
    const newKeyframes = property.keyframes.filter(kf => kf.id !== selectedKeyframe.keyframeID);

    // Set the new keyframes
    set(animTargetAtomFamily(selectedKeyframe.targetID), {
        ...animTarget,
        properties: {
            ...animTarget.properties,
            [selectedKeyframe.property]: {
                ...property,
                keyframes: [...newKeyframes]
            }
        }
    });
});

export default function useRemoveSelectedKeyframe() {
    return useSetAtom(removeSelectedKeyframeAtom);
}