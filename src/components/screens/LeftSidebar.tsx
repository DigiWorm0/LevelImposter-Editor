import SceneGraph from "../scenegraph/SceneGraph";
import {Paper} from "@mui/material";
import React from "react";
import usePanelSize from "../../hooks/ui/usePanelSize";
import useSetFocus, {Scope} from "../../hooks/input/useFocus";

export default function LeftSidebar() {
    const [size] = usePanelSize("left-sidebar");
    const setFocus = useSetFocus();

    return (
        <Paper
            elevation={1}
            square
            onMouseDown={() => setFocus(Scope.SceneGraph)}
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
        >
            <SceneGraph/>

            {/*<Draggable*/}
            {/*    axis="x"*/}
            {/*    position={{x: size ?? 270, y: 0}}*/}
            {/*    onDrag={(_, {x}) => setSize(x)}*/}
            {/*    bounds={{left: 220}}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        style={{*/}
            {/*            position: "absolute",*/}
            {/*            top: 0,*/}
            {/*            left: -6,*/}
            {/*            width: 12,*/}
            {/*            height: "100%",*/}
            {/*            cursor: "ew-resize",*/}
            {/*            backgroundColor: "transparent"*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Draggable>*/}
        </Paper>
    );
}