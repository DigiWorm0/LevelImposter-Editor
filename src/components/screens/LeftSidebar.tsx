import SceneGraph from "../scenegraph/SceneGraph";
import {Paper} from "@mui/material";
import React from "react";
import {useHotkeysContext} from "react-hotkeys-hook";
import {Scope} from "../../hooks/input/useHotkeysHandler";
import usePanelSize from "../../hooks/ui/usePanelSize";
import Draggable from "react-draggable";

export default function LeftSidebar() {
    const {enableScope, disableScope} = useHotkeysContext();
    const [size, setSize] = usePanelSize("left-sidebar");

    return (
        <Paper
            elevation={1}
            square
            sx={{
                width: size ?? 270,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                paddingTop: 1,
                pointerEvents: "auto",
                position: "relative",
                zIndex: -10
            }}
            onFocus={() => enableScope(Scope.SceneGraph)}
            onBlur={() => disableScope(Scope.SceneGraph)}
        >
            <SceneGraph/>

            <Draggable
                axis="x"
                position={{x: size ?? 270, y: 0}}
                onDrag={(_, {x}) => setSize(x)}
                bounds={{left: 220}}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: -6,
                        width: 12,
                        height: "100%",
                        cursor: "ew-resize",
                        backgroundColor: "transparent"
                    }}
                />
            </Draggable>
        </Paper>
    );
}