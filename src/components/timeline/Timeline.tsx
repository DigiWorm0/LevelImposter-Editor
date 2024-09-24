import TimelineHeader from "./header/TimelineHeader";
import TimelineBody from "./body/TimelineBody";
import {useChangeTimelineScale} from "../../hooks/timeline/useChangeTimelineScale";
import ErrorBoundary from "../utils/ErrorBoundary";
import {Alert, AlertTitle} from "@mui/material";

export default function Timeline() {
    const changeTimelineScale = useChangeTimelineScale();

    return (
        <ErrorBoundary
            fallback={
                <Alert severity={"error"}>
                    <AlertTitle>
                        UH OH!
                    </AlertTitle>
                    A fatal error occurred while rendering this animation timeline.
                    Try saving your work and refreshing the page.
                    You can also report this issue to #bug-reports on the Discord server.
                </Alert>
            }
        >
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
        </ErrorBoundary>
    );
}