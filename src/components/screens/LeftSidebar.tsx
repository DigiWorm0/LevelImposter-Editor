import SceneGraph from "../scenegraph/SceneGraph";
import {Paper} from "@mui/material";
import React from "react";
import Resizable from "../utils/Resizable";
import {Scope} from "@editor/focus/focusStore";
import {setFocus} from "@editor/focus/setFocus";

export default function LeftSidebar() {
    return (
        <Resizable
            storageKey={"left-sidebar-width"}
            defaultSize={270}
            minSize={220}
            barLocation={"right"}
        >
            <Paper
                elevation={1}
                square
                onMouseDown={() => setFocus(Scope.SceneGraph)}
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 1,
                    pointerEvents: "auto",
                    position: "relative",
                    zIndex: -10
                }}
            >
                <SceneGraph/>
            </Paper>
        </Resizable>
    );
}