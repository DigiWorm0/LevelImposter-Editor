import React from "react";
import Konva from "konva";
import zoomCanvas from "../../utils/canvas/zoomCanvas";
import useFocusedHotkeys from "../input/useFocusedHotkeys";
import {Scope} from "../input/useFocus";

const ZOOM_SPEED = 100;
const PAN_SPEED = 100;

export default function useCameraKeyboardControl(stageRef: React.RefObject<Konva.Stage>) {
    // Get the stage
    const stage = stageRef.current;

    // Pan the camera
    const pan = (x: number, y: number) => {
        if (!stage)
            return;

        stage.x(stage.x() + x);
        stage.y(stage.y() + y);
    };

    // Zoom
    useFocusedHotkeys("ctrl+=", () => zoomCanvas(stage, ZOOM_SPEED), Scope.Canvas);
    useFocusedHotkeys("ctrl+minus", () => zoomCanvas(stage, -ZOOM_SPEED), Scope.Canvas);

    // Pan
    useFocusedHotkeys("up", () => pan(0, PAN_SPEED), Scope.Canvas);
    useFocusedHotkeys("down", () => pan(0, -PAN_SPEED), Scope.Canvas);
    useFocusedHotkeys("left", () => pan(PAN_SPEED, 0), Scope.Canvas);
    useFocusedHotkeys("right", () => pan(-PAN_SPEED, 0), Scope.Canvas);
}