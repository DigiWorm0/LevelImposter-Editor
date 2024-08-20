import usePlayhead from "../../../hooks/timeline/usePlayhead";
import Draggable from "react-draggable";
import {useTimelineScaleValue} from "../../../hooks/timeline/useTimelineScale";
import useTimelineInterval from "../../../hooks/timeline/useTimelineInterval";
import useTimelineOffset from "../../../hooks/timeline/useTimelineOffset";
import React from "react";
import {useSettingsValue} from "../../../hooks/useSettings";

export default function TimelinePlayheadHandle() {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const [t, setT] = usePlayhead();
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();
    const [timelineOffset] = useTimelineOffset();
    const {isTimelineSnapEnabled} = useSettingsValue();

    return (
        <Draggable
            nodeRef={nodeRef}
            axis="x"
            position={{
                x: (t - timelineOffset) * timelineScale,
                y: 0
            }}
            grid={isTimelineSnapEnabled ? [timelineScale * timelineInterval, 0] : undefined}
            onDrag={(_, {x}) => {
                let t = (x / timelineScale) + timelineOffset;
                if (isTimelineSnapEnabled)
                    t = Math.round(t / timelineInterval) * timelineInterval;
                setT(t);
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
                    height: 15,
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