import TimelineHeader from "./TimelineHeader";
import TimelineBody from "./TimelineBody";
import {useSetTimelineScale} from "../../hooks/timeline/useTimelineScale";

const SCROLL_SCALE = 1.002;

export default function Timeline() {
    const setTimelineScale = useSetTimelineScale();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: 100,
                flexGrow: 1,
            }}
            onWheel={(e) => {
                setTimelineScale((prev) => {
                    return Math.pow(SCROLL_SCALE, -e.deltaY) * prev;
                });
            }}
        >
            <TimelineHeader/>
            <TimelineBody/>
        </div>
    );
}