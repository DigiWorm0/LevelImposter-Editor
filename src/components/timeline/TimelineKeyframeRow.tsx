import {Paper} from "@mui/material";
import React from "react";

export interface TimelineKeyframeRowProps {
    children?: React.ReactNode;
}

export default function TimelineKeyframeRow(props: TimelineKeyframeRowProps) {
    return (
        <Paper
            elevation={5}
            square
            sx={{
                flexGrow: 1,
                boxShadow: "none",
                borderBottom: "1px solid rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "row",
            }}
        >
            {props.children}
        </Paper>
    );
}