import {Box} from "@mui/material";
import React from "react";

export interface TimelineRowProps {
    header?: React.ReactNode;
    children?: React.ReactNode;
    hideTimeline?: boolean;
}

export default function TimelineRow(props: TimelineRowProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
            }}
        >
            <Box
                sx={{
                    width: 270,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {props.header}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    alignItems: "stretch",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
}