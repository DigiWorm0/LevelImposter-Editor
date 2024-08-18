import React from "react";
import {Paper} from "@mui/material";
import useTimelineVisible from "../../hooks/ui/useTimelineVisible";
import Timeline from "../timeline/Timeline";
import LazyCollapse from "../properties/util/LazyCollapse";

export default function BottomBar() {
    const [isTimelineVisible] = useTimelineVisible();

    return (
        <LazyCollapse
            in={isTimelineVisible}
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
                elevation={1}
                square
            >
                <Timeline/>
            </Paper>
        </LazyCollapse>
    );
}