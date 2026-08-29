import Draggable from "react-draggable";
import React from "react";
import {useSettingsValue} from "@/hooks/useSettings";
import {useAtomValue} from "jotai";
import {animatorsPlayheadAtom, timelineScaleAtom} from "@editor/animators/animatorPlaybackStore";
import {setPlaybackState} from "@editor/animators/setPlaybackState";
import {timelineIntervalAtom} from "@/hooks/timeline/useTimelineInterval";

export default function TimelinePlayheadHandle() {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const {isTimelineSnapEnabled} = useSettingsValue();
    const t = useAtomValue(animatorsPlayheadAtom);
    const timelineScale = useAtomValue(timelineScaleAtom);
    const timelineInterval = useAtomValue(timelineIntervalAtom);

    // Snaps a time value to the timeline interval
    const snapToInterval = (t: number) => {
        if (isTimelineSnapEnabled)
            return Math.round(t / timelineInterval) * timelineInterval;
        return t;
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            axis="x"
            position={{
                x: t * timelineScale,
                y: 0
            }}
            grid={isTimelineSnapEnabled ? [timelineScale * timelineInterval, 0] : undefined}
            onDrag={(_, {x}) => {
                const t = snapToInterval(x / timelineScale);
                setPlaybackState(false, t);
            }}
            onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            positionOffset={{x: 0, y: 0}}
            bounds={{left: 0}}
        >
            <div
                ref={nodeRef}
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: 14,
                    height: 20,
                    zIndex: 10,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,

                    backgroundColor: "red",
                    cursor: "grab",
                }}
            />
        </Draggable>

    );
}