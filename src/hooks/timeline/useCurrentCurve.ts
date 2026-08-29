import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import GUID from "../../types/common/GUID";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import LIAnimCurve from "../../types/li/LIAnimCurve";
import {getAdjacentKeyframe} from "@editor/animators/keyframes/getAdjacentKeyframe";
import {mapAtom} from "@editor/state/documentStore";

export interface CurrentCurveOptions {
    targetID: GUID;
    property: LIAnimPropertyType;
}

const DEFAULT_CURVE: LIAnimCurve = "linear";

export const currentCurveAtomFamily = atomFamily((options: CurrentCurveOptions) => atom((get) => {
    const prevKeyframe = getAdjacentKeyframe(
        get(mapAtom),
        options.targetID,
        options.property,
        "prev"
    );
    if (!prevKeyframe)
        return null;

    return prevKeyframe.nextCurve ?? DEFAULT_CURVE;
}), (a, b) => {
    return a.property === b.property &&
        a.targetID === b.targetID;
});

export default function useCurrentCurve(options: CurrentCurveOptions) {
    return useAtomValue(currentCurveAtomFamily(options));
}