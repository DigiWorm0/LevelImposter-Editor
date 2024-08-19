import {atom, useAtomValue} from "jotai";
import {timelineScaleAtom} from "./useTimelineScale";

const DEFAULT_TICK_INTERVAL = .1;

export const timelineIntervalAtom = atom((get) => {
    // Get the current timeline scale
    const timelineScale = get(timelineScaleAtom);

    // Safety check, prevents division by zero or infinite loops
    if (timelineScale <= 0)
        return DEFAULT_TICK_INTERVAL;

    // Repeatedly shrink the interval until it is greater than 5
    let interval = DEFAULT_TICK_INTERVAL;
    while (interval * timelineScale < 5)
        interval *= 10;

    // Return the interval
    return interval;
});

export default function useTimelineInterval() {
    return useAtomValue(timelineIntervalAtom);
}