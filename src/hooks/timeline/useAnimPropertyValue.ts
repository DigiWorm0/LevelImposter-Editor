import {atomFamily} from "jotai/utils";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import GUID from "../../types/generic/GUID";
import {atom, useAtom} from "jotai";
import {playheadAtom} from "./usePlayhead";
import lerp from "../../utils/math/lerp";
import {addKeyframeAtom} from "./useAddKeyframe";
import {adjecentKeyframeAtomFamily} from "./useAdjecentKeyframe";
import {currentCurveAtomFamily} from "./useCurrentCurve";

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

            // Get the current curve
            const curve = get(currentCurveAtomFamily(options));

            // Get the previous/next keyframe
            const prevKeyframe = get(prevKeyframeAtom);
            const nextKeyframe = get(nextKeyframeAtom);

            // If there is no next keyframe, return the last keyframe
            if (!nextKeyframe)
                return prevKeyframe?.value;

            // If there is no previous keyframe, return the first keyframe
            if (!prevKeyframe)
                return nextKeyframe.value;

            // Return the interpolated value
            const t = (playhead - prevKeyframe.t) / (nextKeyframe.t - prevKeyframe.t);

            if (curve === "linear")
                return lerp(prevKeyframe.value, nextKeyframe.value, t);
            else if (curve === "easeIn")
                return lerp(prevKeyframe.value, nextKeyframe.value, t * t);
            else if (curve === "easeOut")
                return lerp(prevKeyframe.value, nextKeyframe.value, t * (2 - t));
            else if (curve === "easeInOut")
                return lerp(prevKeyframe.value, nextKeyframe.value, t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

            return prevKeyframe.value;
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