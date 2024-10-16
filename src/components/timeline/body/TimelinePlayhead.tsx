import usePlayhead from "../../../hooks/timeline/usePlayhead";
import {useTimelineScaleValue} from "../../../hooks/timeline/useTimelineScale";

const PADDING_LEFT = 6; // px

export default function TimelinePlayhead() {
    const [t] = usePlayhead();
    const timelineScale = useTimelineScaleValue();

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: t * timelineScale + PADDING_LEFT,
                width: 2,
                backgroundColor: "red",
                zIndex: 10,
                pointerEvents: "none"
            }}
        />
    );
}