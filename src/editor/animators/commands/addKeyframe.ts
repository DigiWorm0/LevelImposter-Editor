import {MapCommand} from "@editor/history/executeCommand";
import GUID from "@/types/common/GUID";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";
import store from "@/shared/store";
import {getAnimTargetProperty} from "@editor/elements/getAnimTarget";
import {selectedKeyframeAtom} from "@editor/selection/stores/keyframeSelectionStore";
import {animatorsPlayheadAtom} from "@editor/animators/animatorPlaybackStore";

export const addKeyframe = (
    targetID: GUID,
    property: LIAnimPropertyType,
    value?: number
): MapCommand => map => {
    // Get the target properties
    const animTargetProperty = getAnimTargetProperty(map, targetID, property);
    if (!animTargetProperty)
        return;

    // Get the current playhead
    const t = store.get(animatorsPlayheadAtom);

    // Get next id
    const id = animTargetProperty.keyframes
        .reduce((max, k) => Math.max(max, k.id), 0) + 1;

    // Add a new keyframe to the target
    animTargetProperty.keyframes.push({
        id,
        t,
        value: value ?? 0
    });

    // Set selected keyframe
    store.set(selectedKeyframeAtom, {
        keyframeID: id,
        targetID: targetID,
        property: property
    });
};