import LIElement from "../../types/li/LIElement";
import GUID from "../../types/common/GUID";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";
import LIAnimKeyframe from "../../types/li/LIAnimKeyframe";

export const ClipboardContentType = "text/plain";

export default interface ClipboardContent {
    elem?: LIElement[];
    focusIDs?: GUID[];

    keyframe?: {
        targetID: GUID;
        property: LIAnimPropertyType;
        keyframe: LIAnimKeyframe;
    }[];
}