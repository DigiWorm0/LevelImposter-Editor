import store from "@/shared/store";
import {animatorsPlayheadAtom} from "@editor/state/animatorPlaybackStore";
import {timelineIntervalAtom} from "@/hooks/timeline/useTimelineInterval";
import {setPlaybackState} from "@editor/animators/setPlaybackState";

export const stepPlayhead = (dir: "left" | "right") => {
    const t = store.get(animatorsPlayheadAtom);
    const tickSize = store.get(timelineIntervalAtom);

    let newPlayheadT = dir === "left" ? t - tickSize : t + tickSize;
    newPlayheadT = Math.round(newPlayheadT / tickSize) * tickSize;
    setPlaybackState(false, newPlayheadT);
};

export const stepPlayheadLeft = () => stepPlayhead("left");
export const stepPlayheadRight = () => stepPlayhead("right");