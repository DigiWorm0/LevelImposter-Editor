import {atom, useSetAtom} from "jotai";
import generateGUID from "../../utils/strings/generateGUID";
import {MaybeGUID} from "../../types/generic/GUID";
import {animTargetAtomFamily} from "./useAnimTarget";
import {playheadAtom} from "./usePlayhead";
import AnimProperty from "../../types/li/AnimProperty";

export interface AddKeyframeOptions {
    targetID: MaybeGUID;
    property: AnimProperty;
    value?: number;
}

export const addKeyframeAtom = atom(null, (get, set, options: AddKeyframeOptions) => {
    const {targetID, property} = options;
    if (!targetID)
        return;

    // Get the target
    const animTargetAtom = animTargetAtomFamily(targetID);
    const animTarget = get(animTargetAtom);
    if (!animTarget)
        return;

    // Get the current playhead
    const t = get(playheadAtom);

    // Add a new keyframe to the target
    set(animTargetAtom, {
        ...animTarget,
        keyframes: [...animTarget.keyframes, {
            id: generateGUID(),
            t,
            property,
            value: options.value ?? 0
        }]
    });
});

export default function useAddKeyframe() {
    return useSetAtom(addKeyframeAtom);
}