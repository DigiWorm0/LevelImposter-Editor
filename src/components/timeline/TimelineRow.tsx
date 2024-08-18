import {Box} from "@mui/material";
import React from "react";

export interface TimelineRowProps {
    header?: React.ReactNode;
    children?: React.ReactNode;
}

export default function TimelineRow(props: TimelineRowProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                alignItems: "stretch"
            }}
        >
            <Box
                sx={{
                    width: 300,
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
                    alignItems: "stretch"
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
}