import GUID from "@/shared/types/GUID";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";
import {getAnimTarget} from "@editor/document/elements/getAnimTarget";
import {animatorsPlayheadAtom} from "@editor/animators/animatorPlaybackStore";
import store from "@/shared/store";
import LIAnimKeyframe from "@/types/li/LIAnimKeyframe";
import {DocDraft} from "@editor/history/executeCommand";

export const getAdjacentKeyframe = (
    map: DocDraft,
    targetID: GUID,
    property: LIAnimPropertyType,
    direction: "prev" | "next"
): LIAnimKeyframe | null => {
    const animTarget = getAnimTarget(map, targetID);
    if (!animTarget)
        return null;

    const animTargetProperty = animTarget.properties[property];
    if (!animTargetProperty)
        return null;

    // Get/sort the keyframes
    const keyframes = animTargetProperty.keyframes.sort((a, b) => a.t - b.t);

    // Get the current playhead
    const t = store.get(animatorsPlayheadAtom);

    // Get the previous keyframe
    let keyframe: LIAnimKeyframe | null = null;
    for (const k of keyframes) {

        // Previous keyframe
        if (k.t <= t && direction === "prev")
            keyframe = k;

        // Next keyframe
        else if (k.t > t && direction === "next") {
            keyframe = k;
            break;
        }
    }

    return keyframe;
};