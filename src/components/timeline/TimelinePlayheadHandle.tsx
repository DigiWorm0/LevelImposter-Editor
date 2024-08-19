import usePlayhead from "../../hooks/timeline/usePlayhead";
import Draggable from "react-draggable";
import {useTimelineScaleValue} from "../../hooks/timeline/useTimelineScale";
import useTimelineInterval from "../../hooks/timeline/useTimelineInterval";

export default function TimelinePlayheadHandle() {
    const [t, setT] = usePlayhead();
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();

    return (
        <Draggable
            axis="x"
            position={{
                x: t * timelineScale,
                y: 0
            }}
            grid={[timelineScale * timelineInterval, 0]}
            onDrag={(_, {x}) => {
                let t = x / timelineScale;
                t = Math.round(t / timelineInterval) * timelineInterval;
                setT(t);
            }}
            positionOffset={{x: 0, y: 0}}
            bounds={{left: 0}}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: 12,
                    height: 20,
                    zIndex: 10,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,

                    backgroundColor: "red",
                    cursor: "ew-resize"
                }}
            />
        </Draggable>

    );
}