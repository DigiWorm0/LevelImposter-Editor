import React from "react";
import {Paper} from "@mui/material";
import useTimelineVisible from "../../hooks/timeline/useTimelineVisible";
import Timeline from "../timeline/Timeline";
import LazyCollapse from "../properties/util/LazyCollapse";
import useIsSelectedElemType from "../../hooks/elements/useSelectedElemIsType";

export default function BottomBar() {
    const timelineRef = React.useRef<HTMLDivElement>(null);
    const [isTimelineVisible] = useTimelineVisible();
    const isAnim = useIsSelectedElemType("util-triggeranim");

    return (
        <LazyCollapse
            in={isTimelineVisible && isAnim}
            sx={{
                flexShrink: 0,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                pointerEvents: "auto",
                boxShadow: "0 -4px 4px rgba(0,0,0,0.2)",
            }}
        >
            <Paper
                ref={timelineRef}
                elevation={1}
                square
            >
                <Timeline/>
            </Paper>
        </LazyCollapse>
    );
}