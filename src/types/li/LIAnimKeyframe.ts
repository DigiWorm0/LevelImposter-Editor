import GUID from "../generic/GUID";
import AnimProperty from "./AnimProperty";

export default interface LIAnimKeyframe {
    id: GUID;
    t: number;
    property: AnimProperty;
    value: number;

    //nextCurve?: LIAnimCurve;
};