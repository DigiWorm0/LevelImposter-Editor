import {atom, useSetAtom} from "jotai";
import {playheadAtom} from "../timeline/usePlayhead";
import {timelineIntervalAtom} from "../timeline/useTimelineInterval";
import {playAnimAtom} from "../timeline/usePlayAnim";

export const jumpTimelineTickAtom = atom(null, (get, set, prev: boolean) => {

    // Get current time
    const playhead = get(playheadAtom);

    // Get tick size
    const ticksize = get(timelineIntervalAtom);

    // Calculate new time
    const newTime = prev ? playhead - ticksize : playhead + ticksize;

    // Round to the nearest tick
    const roundedTime = Math.round(newTime / ticksize) * ticksize;

    // Set the new time
    set(playheadAtom, Math.max(0, roundedTime));
    
    // Stop the animation
    set(playAnimAtom, false);
});

export default function useJumpTimelineTick() {
    return useSetAtom(jumpTimelineTickAtom);
}