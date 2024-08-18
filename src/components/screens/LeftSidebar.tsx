import SceneGraph from "../scenegraph/SceneGraph";
import {Paper} from "@mui/material";
import React from "react";

export default function LeftSidebar() {
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
        >
            <SceneGraph/>
        </Paper>
    );
}