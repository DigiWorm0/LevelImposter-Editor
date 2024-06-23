import LIAnimCurve from "./LIAnimCurve";
import GUID from "../generic/GUID";
import generateGUID from "../../utils/strings/generateGUID";

export default interface LIAnimKeyframe {
    id: GUID;
    t: number;

    nextCurve?: LIAnimCurve;

    // Transform
    x?: number;
    y?: number;
    z?: number;
    xScale?: number;
    yScale?: number;
    rotation?: number;
};


export const DEFAULT_KEYFRAMES: LIAnimKeyframe[] = [
    { id: generateGUID(), t: 0 },
    { id: generateGUID(), t: 0.5, nextCurve: "easeInOut" },
    { id: generateGUID(), t: 1.5, x: 1, y: 1, xScale: 2, yScale: 2, rotation: 90, nextCurve: "easeInOut" },
    { id: generateGUID(), t: 2, x: 1, y: 0, xScale: 2, yScale: 2, rotation: 90, nextCurve: "easeInOut" },
    { id: generateGUID(), t: 3 },
];