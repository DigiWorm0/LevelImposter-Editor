import {atomFamily} from "jotai/utils";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import GUID from "../../types/common/GUID";
import {atom, useAtom} from "jotai";
import {playheadAtom} from "./usePlayhead";
import {addKeyframeAtom} from "./useAddKeyframe";
import {adjecentKeyframeAtomFamily} from "./useAdjecentKeyframe";
import {lerpBetweenKeyframes} from "./useAnimationPlayback";

export interface AnimPropertyValueOptions {
    targetID: GUID;
    property: LIAnimPropertyType;
}

export const animPropertyValueAtom = atomFamily(
    (options: AnimPropertyValueOptions) => {
        const prevKeyframeAtom = adjecentKeyframeAtomFamily({
            targetID: options.targetID,
            property: options.property,
            direction: "prev"
        });
        const nextKeyframeAtom = adjecentKeyframeAtomFamily({
            targetID: options.targetID,
            property: options.property,
            direction: "next"
        });

        return atom((get) => {
            // Get the current playhead time
            const playhead = get(playheadAtom);

            // Get the previous/next keyframe
            const prevKeyframe = get(prevKeyframeAtom);
            const nextKeyframe = get(nextKeyframeAtom);

            // If there is no next keyframe, return the last keyframe
            if (!nextKeyframe)
                return prevKeyframe?.value;

            // If there is no previous keyframe, return the first keyframe
            if (!prevKeyframe)
                return nextKeyframe.value;

            // Interpolate between the two keyframes
            return lerpBetweenKeyframes(prevKeyframe, nextKeyframe, playhead);
        }, (get, set, value: number) => {
            // Find a keyframe at the current playhead
            const playhead = get(playheadAtom);
            const prevKeyframe = get(prevKeyframeAtom);
            const keyframe = prevKeyframe && prevKeyframe.t === playhead ? prevKeyframe : null;

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
                set(prevKeyframeAtom, {
                    ...keyframe,
                    value
                });
            }
        });
    },
    (a, b) => a.targetID === b.targetID && a.property === b.property
);

export default function useAnimPropertyValue(options: AnimPropertyValueOptions) {
    return useAtom(animPropertyValueAtom(options));
}