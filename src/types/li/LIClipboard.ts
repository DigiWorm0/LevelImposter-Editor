import LIElement from "./LIElement";
import LIAnimKeyframe from "./LIAnimKeyframe";
import GUID from "../generic/GUID";
import LIAnimPropertyType from "./LIAnimPropertyType";

export default interface LIClipboard {
    elem?: LIElement[];
    keyframe?: {
        targetID: GUID;
        property: LIAnimPropertyType;
        keyframe: LIAnimKeyframe;
    }[];
}