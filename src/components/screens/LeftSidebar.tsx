import SceneGraph from "../scenegraph/SceneGraph";
import {Paper} from "@mui/material";
import React from "react";
import {useHotkeysContext} from "react-hotkeys-hook";
import {Scope} from "../../hooks/input/useHotkeysHandler";

export default function LeftSidebar() {
    const {enableScope, disableScope} = useHotkeysContext();

    return (
        <Paper
            elevation={1}
            square
            sx={{
                width: 270,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                paddingTop: 1,
                pointerEvents: "auto"
            }}
            onFocus={() => enableScope(Scope.SceneGraph)}
            onBlur={() => disableScope(Scope.SceneGraph)}
        >
            <SceneGraph/>
        </Paper>
    );
}