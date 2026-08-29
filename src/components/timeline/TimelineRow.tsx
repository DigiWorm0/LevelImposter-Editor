import {Box} from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import {useAtom, useAtomValue} from "jotai";
import {timelineOffsetAtom, timelineScaleAtom} from "@editor/animators/animatorPlaybackStore";

export interface TimelineRowProps {
    header?: React.ReactNode;
    children?: React.ReactNode;
    hideTimeline?: boolean;
}

export default function TimelineRow(props: TimelineRowProps) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const timelineScale = useAtomValue(timelineScaleAtom);
    const [timelineOffset, setTimelineOffset] = useAtom(timelineOffsetAtom);

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
                <Draggable
                    nodeRef={nodeRef}
                    axis="x"
                    position={{
                        x: -timelineOffset * timelineScale,
                        y: 0
                    }}
                    onDrag={(_, {x}) => {
                        setTimelineOffset(-x / timelineScale);
                    }}
                    bounds={{right: 0}}
                    allowAnyClick
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "calc(infinity * 1px)",
                            height: "100%",
                            zIndex: 10,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "stretch"
                        }}
                        ref={nodeRef}
                        onContextMenu={(e: Event) => e.preventDefault()}
                    >
                        {props.children}
                    </Box>
                </Draggable>
            </Box>
        </Box>
    );
}