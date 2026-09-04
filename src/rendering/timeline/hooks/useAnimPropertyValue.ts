import {atomFamily} from "jotai/utils";
import LIAnimPropertyType from "../../../types/li/LIAnimPropertyType";
import GUID from "@shared/types/GUID";
import {atom, useAtom} from "jotai";
import {lerpBetweenKeyframes} from "./useAnimationPlayback";
import {documentAtom} from "@editor/document/documentStore";
import {getAdjacentKeyframe} from "@editor/animators/keyframes/getAdjacentKeyframe";
import {animatorsPlayheadAtom} from "@editor/animators/animatorPlaybackStore";
import executeCommand from "@editor/history/executeCommand";
import {addKeyframe} from "@editor/animators/commands/addKeyframe";
import {updateAnimationKeyframe} from "@editor/animators/commands/updateAnimationKeyframe";

export interface AnimPropertyValueOptions {
    targetID: GUID;
    property: LIAnimPropertyType;
}

export const animPropertyValueAtom = atomFamily(
    (options: AnimPropertyValueOptions) => atom((get) => {
        // Get the previous/next keyframe
        const map = get(documentAtom);
        const prevKeyframe = getAdjacentKeyframe(map, options.targetID, options.property, "prev");
        const nextKeyframe = getAdjacentKeyframe(map, options.targetID, options.property, "next");

        // Get the current playhead time
        const playhead = get(animatorsPlayheadAtom);

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
        const playhead = get(animatorsPlayheadAtom);
        const map = get(documentAtom);
        const prevKeyframe = getAdjacentKeyframe(map, options.targetID, options.property, "prev");
        const keyframe = prevKeyframe && prevKeyframe.t === playhead ? prevKeyframe : null;

        // If there is no keyframe, create a new keyframe
        if (!keyframe)
            executeCommand(addKeyframe(
                options.targetID,
                options.property,
                value
            ));

        // Otherwise, edit the existing keyframe
        else
            executeCommand(updateAnimationKeyframe(
                options.targetID,
                options.property,
                value
            ));
    }),
    (a, b) => a.targetID === b.targetID && a.property === b.property
);

export default function useAnimPropertyValue(options: AnimPropertyValueOptions) {
    return useAtom(animPropertyValueAtom(options));
}