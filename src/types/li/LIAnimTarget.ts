import GUID from "../generic/GUID";
import LIAnimKeyframe from "./LIAnimKeyframe";

export default interface LIAnimTarget {
    id: GUID;
    elementID: GUID;
    keyframes: LIAnimKeyframe[];
}