import store from "@/shared/store";
import {selectedElementPropAtom} from "@/hooks/elements/useSelectedElemProperty";
import LIAnimTarget from "@/types/li/LIAnimTarget";
import {animatorsPlayheadAtom} from "@editor/state/animatorPlaybackStore";
import LIAnimKeyframe from "@/types/li/LIAnimKeyframe";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";
import GUID from "@/types/common/GUID";
import {setPlaybackState} from "@editor/animators/setPlaybackState";
import {selectKeyframe} from "@editor/selection/selectKeyframe";

export const stepPlayheadToAdjacentKeyframe = (dir: "left" | "right") => {

    // Get AnimTargets
    const animTargets = store.get(selectedElementPropAtom("animTargets")) as LIAnimTarget[];
    if (!animTargets)
        return;

    // Get current time
    const t = store.get(animatorsPlayheadAtom);

    // Find the next keyframe
    let nextKeyframe: LIAnimKeyframe | null = null;
    let nextProperty: LIAnimPropertyType | null = null;
    let nextTargetID: GUID | null = null;

    // Loop through all the targets
    for (const target of animTargets) {

        // Loop through all the properties
        for (const [property, keyframes] of Object.entries(target.properties)) {

            // Loop through all the keyframes
            for (const keyframe of keyframes.keyframes) {

                // If the keyframe is before the playhead and is the closest to the playhead
                if (keyframe.t < t && dir === "left") {
                    if (!nextKeyframe || keyframe.t > nextKeyframe.t) {
                        nextKeyframe = keyframe;
                        nextProperty = property as LIAnimPropertyType;
                        nextTargetID = target.id;
                    }
                }

                // If the keyframe is after the playhead and is the closest to the playhead
                if (keyframe.t > t && dir === "right") {
                    if (!nextKeyframe || keyframe.t < nextKeyframe.t) {
                        nextKeyframe = keyframe;
                        nextProperty = property as LIAnimPropertyType;
                        nextTargetID = target.id;
                    }
                }
            }
        }
    }

    // If there is a keyframe
    if (nextKeyframe && nextProperty && nextTargetID) {
        setPlaybackState(false, nextKeyframe.t);
        selectKeyframe({
            targetID: nextTargetID,
            property: nextProperty,
            keyframeID: nextKeyframe.id
        });
    }
};

export const stepPlayheadToNextKeyframe = () => stepPlayheadToAdjacentKeyframe("left");
export const stepPlayheadToPrevKeyframe = () => stepPlayheadToAdjacentKeyframe("right");