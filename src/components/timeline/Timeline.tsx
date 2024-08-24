import TimelineHeader from "./header/TimelineHeader";
import TimelineBody from "./body/TimelineBody";
import {useChangeTimelineScale} from "../../hooks/timeline/useChangeTimelineScale";

export default function Timeline() {
    const changeTimelineScale = useChangeTimelineScale();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
            }}
            onWheel={(e) => changeTimelineScale(-e.deltaY)}
        >
            <TimelineHeader/>
            <TimelineBody/>
        </div>
    );
}