import React from "react";
import {Paper} from "@mui/material";
import Timeline from "../timeline/Timeline";
import LazyCollapse from "../properties/util/LazyCollapse";
import useSetFocus, {Scope} from "../../hooks/input/useFocus";
import Resizable from "../utils/Resizable";
import useIsSelectedElemType from "../../hooks/elements/useIsSelectedElemType";
import {useAtomValue} from "jotai";
import {isTimelineVisibleAtom} from "@editor/animators/animatorPlaybackStore";

export default function BottomBar() {
    const timelineRef = React.useRef<HTMLDivElement>(null);
    const isTimelineVisible = useAtomValue(isTimelineVisibleAtom);
    const isAnim = useIsSelectedElemType("util-triggeranim");
    const setFocus = useSetFocus();

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
            onMouseDown={() => setFocus(Scope.Timeline)}
        >
            <Resizable
                storageKey={"bottom-bar-height"}
                defaultSize={250}
                minSize={100}
                barLocation={"top"}
            >
                <Paper
                    ref={timelineRef}
                    elevation={1}
                    square
                    sx={{height: "100%"}}
                >
                    <Timeline/>
                </Paper>
            </Resizable>
        </LazyCollapse>
    );
}