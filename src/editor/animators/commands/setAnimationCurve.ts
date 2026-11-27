import GUID from "@/shared/types/GUID";
import LIAnimPropertyType from "@/map-format/LIAnimPropertyType";
import {EditorCommand} from "@editor/history/executeCommand";
import LIAnimCurve from "@/map-format/LIAnimCurve";
import {getAdjacentKeyframe} from "@editor/animators/keyframes/getAdjacentKeyframe";

export const setAnimationCurve = (
    targetID: GUID,
    property: LIAnimPropertyType,
    curve: LIAnimCurve
): EditorCommand => map => {
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