import {atom, useSetAtom} from "jotai";
import {timelineScaleAtom} from "./useTimelineScale";
import {timelineOffsetAtom} from "./useTimelineOffset";
import {playheadAtom} from "./usePlayhead";

const SCROLL_SCALE = 1.002;

const changeTimelineScaleAtom = atom(null, (get, set, delta: number) => {
    // Get Current Values
    const prevScale = get(timelineScaleAtom); // px/s
    const prevOffset = get(timelineOffsetAtom); // s
    const playhead = get(playheadAtom); // s

    // Calculate New Scale
    const scaleMultiplier = Math.pow(SCROLL_SCALE, delta);
    const newScale = prevScale * scaleMultiplier; // px/s

    // Adjust Offset to Keep Playhead in the Same Position
    const playheadOffset = (playhead - prevOffset) * prevScale; // px
    const newOffset = playhead - playheadOffset / newScale; // s

    // Clamp Offset

    set(timelineScaleAtom, newScale);
    set(timelineOffsetAtom, Math.max(0, newOffset));
});

export function useChangeTimelineScale() {
    return useSetAtom(changeTimelineScaleAtom);
}