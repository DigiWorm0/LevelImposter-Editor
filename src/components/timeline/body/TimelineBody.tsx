import {Box, List, Paper} from "@mui/material";
import TimelineElement from "./TimelineElement";
import TimelineAddRow from "../footer/TimelineAddRow";
import {useSelectedElemPropValue} from "../../../hooks/elements/useSelectedElemProperty";
import React from "react";
import TimelineDummyRow from "../footer/TimelineDummyRow";
import useWindowSize from "../../../hooks/canvas/useWindowSize";

const DUMMY_ROW_HEIGHT = 32;

export default function TimelineBody() {
    const animTargets = useSelectedElemPropValue("animTargets");
    const [, windowHeight] = useWindowSize();

    const dummyRowCount = Math.ceil(windowHeight / DUMMY_ROW_HEIGHT);

    return (
        <Paper
            elevation={2}
            sx={{
                overflowX: "hidden",
                overflowY: "hidden",
                height: "100%",
            }}
        >
            <List
                dense
                sx={{
                    padding: 0,
                    height: "100%"
                }}
            >
                {/* Scrollable area for timeline elements */}
                <Box
                    sx={{
                        overflowY: "auto",
                        maxHeight: "100%"
                    }}
                >
                    {animTargets?.map((target) => (
                        <TimelineElement
                            key={target.id}
                            id={target.id}
                        />
                    ))}
                    <TimelineAddRow/>
                </Box>

                {Array.from({length: dummyRowCount}).map((_, i) => (
                    <TimelineDummyRow key={i}/>
                ))}
            </List>

        </Paper>
    );
}