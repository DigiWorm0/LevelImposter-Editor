import React from "react";
import {Layer, Stage} from "react-konva";
import CanvasGrid from "../canvas/CanvasGrid";
import SelectedMapElement from "../canvas/SelectedMapElement";
import {useMapProperties} from "../../hooks/map/useMap";
import useCameraMouseControl from "../../hooks/canvas/useCameraMouseControl";
import useWindowSize from "../../hooks/canvas/useWindowSize";
import MapElementsRenderer from "../canvas/MapElementsRenderer";
import {useHotkeysContext} from "react-hotkeys-hook";
import {Paper} from "@mui/material";
import useDeselectAll from "../../hooks/map/useDeselectAll";
import useCameraKeyboardControl from "../../hooks/canvas/useCameraKeyboardControl";
import useCameraTouchControl from "../../hooks/canvas/useCameraTouchControl";
import useCameraEmbedControl from "../../hooks/canvas/useCameraEmbedControl";
import Konva from "konva";
import useCameraJumpControl from "../../hooks/canvas/useCameraJumpControl";
import {Scope} from "../../hooks/input/useHotkeysHandler";

export default function Canvas() {
    const pageRef = React.useRef<HTMLDivElement>(null);
    const [windowWidth, windowHeight] = useWindowSize();
    const [properties] = useMapProperties();
    const {enableScope, disableScope} = useHotkeysContext();
    const deselectAll = useDeselectAll();

    // Camera Controls
    const stageRef = React.useRef<Konva.Stage>(null);
    useCameraMouseControl(stageRef);
    useCameraKeyboardControl(stageRef);
    useCameraTouchControl(stageRef);
    useCameraEmbedControl(stageRef);
    useCameraJumpControl(stageRef);

    return (
        <Paper
            ref={pageRef}
            style={properties.bgColor ? {backgroundColor: properties.bgColor} : undefined}
            tabIndex={-1}
            elevation={0}

            onFocus={() => enableScope(Scope.Canvas)}
            onBlur={() => disableScope(Scope.Canvas)}
            onMouseDown={() => pageRef.current?.focus()}
            onTouchStart={() => pageRef.current?.focus()}

            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "auto"
            }}
        >
            <Stage
                id="canvas"
                width={windowWidth}
                height={windowHeight}
                x={windowWidth / 2}
                y={windowHeight / 2}
                ref={stageRef}
                perfectDrawEnabled={false}
                imageSmoothingEnabled={properties.pixelArtMode !== true}
                onClick={deselectAll}
            >
                <Layer>
                    <MapElementsRenderer/>
                    <SelectedMapElement/>
                    <CanvasGrid/>
                </Layer>
            </Stage>
        </Paper>
    );
}