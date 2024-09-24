import {atom, useAtomValue} from "jotai";
import {timelineScaleAtom} from "./useTimelineScale";

const DEFAULT_TICK_INTERVAL = .01; // seconds
const BREAK_OFFSET = -0.8; // offset to break the scale into intervals

export const timelineIntervalAtom = atom((get) => {
    // Get the current timeline scale
    const timelineScale = get(timelineScaleAtom);

    // Safety check, prevents division by zero or infinite loops
    if (timelineScale <= 0)
        return DEFAULT_TICK_INTERVAL;

    // Calculate the exponent of the scale
    const exponent = Math.floor(Math.log10(timelineScale) + BREAK_OFFSET);

    // Return the interval
    return Math.pow(10, -exponent);
});

export default function useTimelineInterval() {
    return useAtomValue(timelineIntervalAtom);
}