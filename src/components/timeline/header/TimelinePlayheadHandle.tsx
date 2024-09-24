import usePlayhead from "../../../hooks/timeline/usePlayhead";
import Draggable from "react-draggable";
import {useTimelineScaleValue} from "../../../hooks/timeline/useTimelineScale";
import useTimelineInterval from "../../../hooks/timeline/useTimelineInterval";
import React from "react";
import {useSettingsValue} from "../../../hooks/useSettings";

export default function TimelinePlayheadHandle() {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const [t, setT] = usePlayhead();
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();
    const {isTimelineSnapEnabled} = useSettingsValue();

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
                setT(t);
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