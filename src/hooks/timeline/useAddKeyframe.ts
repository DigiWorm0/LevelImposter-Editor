import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/generic/GUID";
import {playheadAtom} from "./usePlayhead";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import {animTargetPropertyAtomFamily} from "./useAnimTargetProperty";
import {selectedKeyframeAtom} from "./useSelectedKeyframe";

export interface AddKeyframeOptions {
    targetID: MaybeGUID;
    property: LIAnimPropertyType;
    value?: number;
}

export const addKeyframeAtom = atom(null, (get, set, options: AddKeyframeOptions) => {
    const {targetID, property} = options;
    if (!targetID)
        return;

    // Get the target properties
    const animTargetPropertyAtom = animTargetPropertyAtomFamily({
        targetID: targetID,
        property: property
    });
    const animTargetProperty = get(animTargetPropertyAtom);
    if (!animTargetProperty)
        return;

    // Get the current playhead
    const t = get(playheadAtom);

    // Get next id
    const id = animTargetProperty.keyframes.reduce((max, k) => Math.max(max, k.id), 0) + 1;

    // Add a new keyframe to the target
    set(animTargetPropertyAtom, {
        ...animTargetProperty,
        keyframes: [...animTargetProperty.keyframes, {
            id,
            t,
            value: options.value ?? 0
        }]
    });

    // Set selected keyframe
    set(selectedKeyframeAtom, {
        keyframeID: id,
        targetID: targetID,
        property: property
    });
});

export default function useAddKeyframe() {
    return useSetAtom(addKeyframeAtom);
}