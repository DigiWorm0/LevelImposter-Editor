import {atomFamily} from "jotai/utils";
import AnimProperty from "../../types/li/AnimProperty";
import GUID from "../../types/generic/GUID";
import {atom, useAtom} from "jotai";
import {playheadAtom} from "./usePlayhead";
import {animTargetAtomFamily} from "./useAnimTarget";
import LIAnimKeyframe from "../../types/li/LIAnimKeyframe";
import lerp from "../../utils/math/lerp";
import {addKeyframeAtom} from "./useAddKeyframe";

export interface AnimPropertyValueOptions {
    targetID: GUID;
    property: AnimProperty;
}

export const animPropertyValueAtom = atomFamily(
    (options: AnimPropertyValueOptions) => {
        const animTargetAtom = animTargetAtomFamily(options.targetID);

        return atom((get) => {
            // Get the current anim target
            const animTarget = get(animTargetAtom);
            if (!animTarget)
                return null;

            // Get the keyframes of the current property
            const keyframes = animTarget.keyframes.filter(kf => kf.property === options.property);
            if (keyframes.length === 0)
                return null;
            keyframes.sort((a, b) => a.t - b.t);

            // Get the current playhead time
            const playhead = get(playheadAtom);

            // Get the previous/next keyframe
            let prevKeyframe: LIAnimKeyframe | null = null;
            let nextKeyframe: LIAnimKeyframe | null = null;
            for (const keyframe of keyframes) {
                if (keyframe.t <= playhead)
                    prevKeyframe = keyframe;
                if (keyframe.t > playhead) {
                    nextKeyframe = keyframe;
                    break;
                }
            }

            // If there is no next keyframe, return the last keyframe
            if (!nextKeyframe)
                return prevKeyframe?.value;

            // If there is no previous keyframe, return the first keyframe
            if (!prevKeyframe)
                return nextKeyframe.value;

            // Return the interpolated value
            const t = (playhead - prevKeyframe.t) / (nextKeyframe.t - prevKeyframe.t);
            return lerp(prevKeyframe.value, nextKeyframe.value, t);
        }, (get, set, value: number) => {
            // Get the current anim target
            const animTarget = get(animTargetAtom);
            if (!animTarget)
                return;

            // Find a keyframe at the current playhead
            const playhead = get(playheadAtom);
            const keyframe = animTarget.keyframes.find(
                kf => kf.t === playhead &&
                    kf.property === options.property
            );

            console.log(keyframe);

            // If there is no keyframe, create a new keyframe
            if (!keyframe) {
                set(addKeyframeAtom, {
                    targetID: options.targetID,
                    property: options.property,
                    value
                });
            }

            // Otherwise, edit the existing keyframe
            else {
                set(animTargetAtom, {
                    ...animTarget,
                    keyframes: animTarget.keyframes.map(kf => {
                        if (kf === keyframe)
                            return {...kf, value};
                        return kf;
                    })
                });
            }
        });
    },
    (a, b) => a.targetID === b.targetID && a.property === b.property
);

export default function useAnimPropertyValue(options: AnimPropertyValueOptions) {
    return useAtom(animPropertyValueAtom(options));
}