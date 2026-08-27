import React from "react";
import {mapPropsAtom} from "../../editor/state/documentStore";
import {Paper} from "@mui/material";
import useSetFocus, {Scope} from "../../hooks/input/useFocus";
import Canvas2 from "../canvas2/Canvas2";
import {useAtomValue} from "jotai";

export default function Canvas() {
    const properties = useAtomValue(mapPropsAtom);
    const setFocus = useSetFocus();

    return (
        <Paper
            style={properties.bgColor ? {backgroundColor: properties.bgColor} : undefined}
            tabIndex={-1}
            elevation={0}
            onClick={() => setFocus(Scope.Canvas)}

            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "auto"
            }}
        >
            <Canvas2/>
            {/*<Stage*/}
            {/*    id="canvas"*/}
            {/*    width={windowWidth}*/}
            {/*    height={windowHeight}*/}
            {/*    x={windowWidth / 2}*/}
            {/*    y={windowHeight / 2}*/}
            {/*    ref={stageRef}*/}
            {/*    perfectDrawEnabled={false}*/}
            {/*    imageSmoothingEnabled={properties.pixelArtMode !== true}*/}
            {/*    onClick={deselectAll}*/}
            {/*>*/}
            {/*    <Layer>*/}
            {/*        <MapElementsRenderer/>*/}
            {/*        <SelectedMapElement/>*/}
            {/*        <CanvasGrid/>*/}
            {/*    </Layer>*/}
            {/*</Stage>*/}
        </Paper>
    );
}