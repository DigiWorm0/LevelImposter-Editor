import {atom, useSetAtom} from "jotai";
import {timelineScaleAtom} from "./useTimelineScale";
import {timelineOffsetAtom} from "./useTimelineOffset";
import {playheadAtom} from "./usePlayhead";
import clamp from "../../utils/math/clamp";

const MIN_SCALE = 0.01;
const MAX_SCALE = 40000;
const SCROLL_SCALE = 1.002;

const changeTimelineScaleAtom = atom(null, (get, set, delta: number) => {
    // Get Current Values
    const prevScale = get(timelineScaleAtom); // px/s
    const prevOffset = get(timelineOffsetAtom); // s
    const playhead = get(playheadAtom); // s

    // Calculate New Scale
    const scaleMultiplier = Math.pow(SCROLL_SCALE, delta);
    const newScale = clamp(prevScale * scaleMultiplier, MIN_SCALE, MAX_SCALE); // px/s

    // Prevent Adjustment if it's Already at the Limit
    if (newScale === prevScale)
        return;

    // Adjust Offset to Keep Playhead in the Same Position
    const playheadOffset = (playhead - prevOffset) * prevScale; // px
    const newOffset = Math.max(playhead - playheadOffset / newScale, 0); // s

    set(timelineScaleAtom, newScale);
    set(timelineOffsetAtom, newOffset);
});

export function useChangeTimelineScale() {
    return useSetAtom(changeTimelineScaleAtom);
}