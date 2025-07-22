import LIElement from "./LIElement";
import LIAnimKeyframe from "./LIAnimKeyframe";
import GUID from "../common/GUID";
import LIAnimPropertyType from "./LIAnimPropertyType";

export default interface LIClipboard {
    elem?: LIElement[];
    keyframe?: {
        targetID: GUID;
        property: LIAnimPropertyType;
        keyframe: LIAnimKeyframe;
    }[];
}