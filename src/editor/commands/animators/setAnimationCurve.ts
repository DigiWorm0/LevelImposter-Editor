import GUID from "@/types/common/GUID";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";
import {MapCommand} from "@editor/history/executeCommand";
import LIAnimCurve from "@/types/li/LIAnimCurve";
import {getAdjacentKeyframe} from "@editor/animators/keyframes/getAdjacentKeyframe";

export const setAnimationCurve = (
    targetID: GUID,
    property: LIAnimPropertyType,
    curve: LIAnimCurve
): MapCommand => map => {
    const prevKeyframe = getAdjacentKeyframe(
        map,
        targetID,
        property,
        "prev"
    );
    if (!prevKeyframe)
        throw new Error(`No previous keyframe found for targetID: ${targetID}, property: ${property}`);

    prevKeyframe.nextCurve = curve;
};