import {Box} from "@mui/material";
import React from "react";
import useTimelineInterval from "../../hooks/timeline/useTimelineInterval";
import useWindowSize from "../../hooks/canvas/useWindowSize";
import {useTimelineScaleValue} from "../../hooks/timeline/useTimelineScale";

const LABEL_INTERVAL = 1; // ticks
const PADDING_LEFT = 6; // px

export default function TimelineTimesteps() {
    const [windowWidth] = useWindowSize();
    const timelineScale = useTimelineScaleValue();
    const timelineInterval = useTimelineInterval();

    const tickCount = Math.ceil(windowWidth / timelineInterval / timelineScale);

    return (
        <Box
            sx={{
                overflow: "hidden",
                position: "relative",
                display: "block",
                width: "100%",
                height: "100%"
            }}
        >

            {Array.from({length: tickCount}).map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: 1,
                        height: i % 10 === 0 ? 12 : 6,
                        backgroundColor: i % 10 === 0 ? "#aaa" : "#888",
                        position: "absolute",
                        left: i * timelineInterval * timelineScale + PADDING_LEFT,
                        bottom: 0
                    }}
                />
            ))}

            {Array.from({length: 10}).map((_, i) => (
                <div
                    key={i}
                    style={{
                        color: "#bbb",
                        position: "absolute",
                        left: i * LABEL_INTERVAL * timelineScale - 50 + PADDING_LEFT,
                        top: 5,
                        width: 100,
                        textAlign: "center"
                    }}
                >
                    <span>{i}</span>
                </div>
            ))}
        </Box>
    );
}