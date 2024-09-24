import {atom, useSetAtom} from "jotai";
import {selectedElementPropAtom} from "../elements/useSelectedElemProperty";
import LIAnimTarget from "../../types/li/LIAnimTarget";
import GUID from "../../types/generic/GUID";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import LIAnimKeyframe from "../../types/li/LIAnimKeyframe";
import {playheadAtom} from "../timeline/usePlayhead";
import {selectedKeyframeAtom} from "../timeline/useSelectedKeyframe";
import {playAnimAtom} from "../timeline/usePlayAnim";

export const jumpToAdjacentKeyframeAtom = atom(null, (get, set, prev: boolean) => {

    // Get AnimTargets
    const animTargets = get(selectedElementPropAtom("animTargets")) as LIAnimTarget[];
    if (!animTargets)
        return;

    // Get current time
    const playhead = get(playheadAtom);

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

                // If the keyframe is after the playhead and is the closest to the playhead
                if (keyframe.t > playhead && !prev) {
                    if (!nextKeyframe || keyframe.t < nextKeyframe.t) {
                        nextKeyframe = keyframe;
                        nextProperty = property as LIAnimPropertyType;
                        nextTargetID = target.id;
                    }
                }

                // If the keyframe is before the playhead and is the closest to the playhead
                if (keyframe.t < playhead && prev) {
                    if (!nextKeyframe || keyframe.t > nextKeyframe.t) {
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

        // Set the playhead
        set(playheadAtom, nextKeyframe.t);

        // Set the selected keyframe
        set(selectedKeyframeAtom, {
            targetID: nextTargetID,
            property: nextProperty,
            keyframeID: nextKeyframe.id
        });

        // Stop the animation
        set(playAnimAtom, false);
    }
});

export default function useJumpToAdjacentKeyframe() {
    return useSetAtom(jumpToAdjacentKeyframeAtom);
}