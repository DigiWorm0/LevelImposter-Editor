import store from "@/shared/store";
import {animatorsPlayheadAtom, timelineOffsetAtom, timelineScaleAtom} from "@editor/animators/animatorPlaybackStore";
import clamp from "@shared/math/clamp";

const MIN_SCALE = 0.01;
const MAX_SCALE = 40000;
const SCROLL_SCALE = 1.002;

export const changeTimelineScale = (delta: number) => {
    // Get Current Values
    const prevScale = store.get(timelineScaleAtom); // px/s
    const prevOffset = store.get(timelineOffsetAtom); // s
    const playhead = store.get(animatorsPlayheadAtom); // s

    // Calculate New Scale
    const scaleMultiplier = Math.pow(SCROLL_SCALE, delta);
    const newScale = clamp(prevScale * scaleMultiplier, MIN_SCALE, MAX_SCALE); // px/s

    // Prevent Adjustment if it's Already at the Limit
    if (newScale === prevScale)
        return;

    // Adjust Offset to Keep Playhead in the Same Position
    const playheadOffset = (playhead - prevOffset) * prevScale; // px
    const newOffset = Math.max(playhead - playheadOffset / newScale, 0); // s

    store.set(timelineScaleAtom, newScale);
    store.set(timelineOffsetAtom, newOffset);
};