import GUID from "@/types/common/GUID";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";
import {MapCommand} from "@editor/history/executeCommand";
import {getAdjacentKeyframe} from "@editor/animators/keyframes/getAdjacentKeyframe";

export const updateAnimationKeyframe = (
    targetID: GUID,
    property: LIAnimPropertyType,
    value: number
): MapCommand => map => {
    const prevKeyframe = getAdjacentKeyframe(
        map,
        targetID,
        property,
        "prev"
    );
    if (!prevKeyframe)
        throw new Error(`No previous keyframe found for targetID: ${targetID}, property: ${property}`);

    prevKeyframe.value = value;
};