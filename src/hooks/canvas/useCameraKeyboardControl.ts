import React from "react";
import Konva from "konva";
import zoomCanvas from "../../utils/canvas/zoomCanvas";
import useUpdateCameraPos from "./useCameraPos";

const ZOOM_SPEED = 100;
const PAN_SPEED = 100;

export default function useCameraKeyboardControl(stageRef: React.RefObject<Konva.Stage>) {
    const updateCameraPos = useUpdateCameraPos(stageRef);

    // Keybinds
    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        const stage = stageRef.current;
        if (!stage)
            return;

        if (e.ctrlKey && e.key === "=") {
            zoomCanvas(stage, ZOOM_SPEED);
        } else if (e.ctrlKey && e.key === "-") {
            zoomCanvas(stage, -ZOOM_SPEED);
        } else if (e.shiftKey && e.key === "ArrowUp") {
            stage.y(stage.y() + PAN_SPEED);
        } else if (e.shiftKey && e.key === "ArrowDown") {
            stage.y(stage.y() - PAN_SPEED);
        } else if (e.shiftKey && e.key === "ArrowLeft") {
            stage.x(stage.x() + PAN_SPEED);
        } else if (e.shiftKey && e.key === "ArrowRight") {
            stage.x(stage.x() - PAN_SPEED);
        } else {
            // Don't prevent default if no action
            return;
        }

        e.preventDefault();
        updateCameraPos();
    }, []);

    // Assign Events
    React.useEffect(() => {
        const stage = stageRef.current;
        if (!stage)
            return () => {
            };

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
}