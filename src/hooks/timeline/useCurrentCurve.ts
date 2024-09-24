import {atom, useAtom} from "jotai";
import {atomFamily} from "jotai/utils";
import GUID from "../../types/generic/GUID";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import LIAnimCurve from "../../types/li/LIAnimCurve";
import {adjecentKeyframeAtomFamily} from "./useAdjecentKeyframe";

export interface CurrentCurveOptions {
    targetID: GUID;
    property: LIAnimPropertyType;
}

const DEFAULT_CURVE: LIAnimCurve = "linear";

export const currentCurveAtomFamily = atomFamily((options: CurrentCurveOptions) => {
    const keyframeAtom = adjecentKeyframeAtomFamily({
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
        const keyframe = get(keyframeAtom);
        const nextKeyframe = get(nextKeyframeAtom);
        if (!keyframe || !nextKeyframe)
            return null;

        return keyframe.nextCurve ?? DEFAULT_CURVE;
    }, (get, set, value: LIAnimCurve) => {
        const keyframe = get(keyframeAtom);
        if (!keyframe)
            return;

        set(keyframeAtom, {
            ...keyframe,
            nextCurve: value
        });
    });
}, (a, b) => {
    return a.property === b.property && a.targetID === b.targetID;
});

export default function useCurrentCurve(options: CurrentCurveOptions) {
    return useAtom(currentCurveAtomFamily(options));
}