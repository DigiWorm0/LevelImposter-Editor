import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import LIAnimPropertyType from "../../../types/li/LIAnimPropertyType";
import GUID from "@shared/types/GUID";
import {animTargetPropertyAtomFamily} from "./useAnimTargetProperty";
import {animatorsPlayheadAtom} from "@editor/animators/animatorPlaybackStore";

export interface CurrentKeyframeOptions {
    targetID: GUID;
    property: LIAnimPropertyType;
}

export const isCurrentKeyframeAtomFamily = atomFamily((options: CurrentKeyframeOptions) => atom((get) => {
    // Get the current anim target
    const animTarget = get(animTargetPropertyAtomFamily(options));
    if (!animTarget)
        return null;

    // Get the keyframe of the current property
    const {keyframes} = animTarget;
    if (keyframes.length === 0)
        return null;

    // Get keyframe at the current playhead
    const playhead = get(animatorsPlayheadAtom);
    const keyframe = keyframes.find(kf => kf.t === playhead);

    // Return whether the keyframe is the current keyframe
    return keyframe !== undefined && keyframe !== null;
}), (a, b) => a.targetID === b.targetID && a.property === b.property);

export default function useIsCurrentKeyframe(options: CurrentKeyframeOptions) {
    return useAtomValue(isCurrentKeyframeAtomFamily(options));
}