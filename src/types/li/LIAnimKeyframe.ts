import LIAnimCurve from "./LIAnimCurve";

export default interface LIAnimKeyframe {
    // Keyframe IDs are local to the property (not a GUID)
    id: number;
    t: number;
    value: number;
    nextCurve?: LIAnimCurve;
};