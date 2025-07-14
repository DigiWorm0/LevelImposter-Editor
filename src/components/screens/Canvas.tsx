import React from "react";
import {useMapProperties} from "../../hooks/map/useMap";
import {Paper} from "@mui/material";
import useSetFocus, {Scope} from "../../hooks/input/useFocus";
import Canvas2 from "../canvas2/Canvas2";

export default function Canvas() {
    // const [windowWidth, windowHeight] = useWindowSize();
    const [properties] = useMapProperties();
    const setFocus = useSetFocus();

    // Camera Controls
    // const stageRef = React.useRef<Konva.Stage>(null);
    // useCameraMouseControl(stageRef);
    // useCameraKeyboardControl(stageRef);
    // useCameraTouchControl(stageRef);
    // useCameraEmbedControl(stageRef);
    // useCameraJumpControl(stageRef);

    return (
        <Paper
            style={properties.bgColor ? {backgroundColor: properties.bgColor} : undefined}
            tabIndex={-1}
            elevation={0}
            onMouseDown={() => setFocus(Scope.Canvas)}

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