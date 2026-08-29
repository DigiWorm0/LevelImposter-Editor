import TimelineHeader from "./header/TimelineHeader";
import TimelineBody from "./body/TimelineBody";
import ErrorBoundary from "../utils/ErrorBoundary";
import {Alert, AlertTitle} from "@mui/material";
import {changeTimelineScale} from "@editor/animators/changeTimelineScale";

export default function Timeline() {
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
                    height: "100%",
                }}
            >
                <div onWheel={(e) => changeTimelineScale(-e.deltaY)}>
                    <TimelineHeader/>
                </div>
                <TimelineBody/>
            </div>
        </ErrorBoundary>
    );
}