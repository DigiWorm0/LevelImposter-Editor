import {atom} from "jotai";
import {atomFamily} from "jotai/utils";
import GUID from "../../types/generic/GUID";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import {animTargetPropertyAtomFamily} from "./useAnimTargetProperty";
import {playheadAtom} from "./usePlayhead";
import LIAnimKeyframe from "../../types/li/LIAnimKeyframe";

export interface AdjecentKeyframeOptions {
    targetID: GUID;
    property: LIAnimPropertyType;
    direction: "prev" | "next";
}

export const adjecentKeyframeAtomFamily = atomFamily((options: AdjecentKeyframeOptions) => {
    const {targetID, property} = options;

    return atom((get) => {

        // Get the target properties
        const animTargetPropertyAtom = animTargetPropertyAtomFamily({
            targetID: targetID,
            property: property
        });
        const animTargetProperty = get(animTargetPropertyAtom);
        if (!animTargetProperty)
            return null;

        // Get/sort the keyframes
        const keyframes = animTargetProperty.keyframes.sort((a, b) => a.t - b.t);

        // Get the current playhead
        const t = get(playheadAtom);

        // Get the previous keyframe
        let keyframe: LIAnimKeyframe | null = null;
        for (const k of keyframes) {

            // Previous keyframe
            if (k.t <= t && options.direction === "prev")
                keyframe = k;

            // Next keyframe
            else if (k.t > t && options.direction === "next") {
                keyframe = k;
                break;
            }
        }

        return keyframe;
    }, (get, set, keyframe: LIAnimKeyframe) => {

        // Get the target properties
        const animTargetPropertyAtom = animTargetPropertyAtomFamily({
            targetID: targetID,
            property: property
        });
        const animTargetProperty = get(animTargetPropertyAtom);
        if (!animTargetProperty)
            return;

        // Get the current value
        const prevKeyframe = get(adjecentKeyframeAtomFamily({
            targetID: targetID,
            property: property,
            direction: "prev"
        }));

        // Update the adjacent keyframe
        set(animTargetPropertyAtom, {
            ...animTargetProperty,
            keyframes: animTargetProperty.keyframes.map((k) => {
                if (k.t === prevKeyframe?.t)
                    return keyframe;
                return k;
            })
        });
    });
}, (a, b) => {
    return a.property === b.property && a.targetID === b.targetID && a.direction === b.direction;
});