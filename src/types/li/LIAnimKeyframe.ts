import LIAnimCurve from "./LIAnimCurve";

export default interface LIAnimKeyframe {
    t: number;
    value: number;
    nextCurve?: LIAnimCurve;
};