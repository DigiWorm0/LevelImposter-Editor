import React from "react";
import Konva from "konva";
import zoomCanvas from "../../utils/canvas/zoomCanvas";

const ZOOM_SPEED = 100;
const PAN_SPEED = 100;

export default function useCameraKeyboardControl(stageRef: React.RefObject<Konva.Stage>) {

    // Keybinds
    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        const stage = stageRef.current;
        if (!stage)
            return;

        if (e.ctrlKey && e.key === "=") {
            e.preventDefault();
            zoomCanvas(stage, ZOOM_SPEED)
        }
        if (e.ctrlKey && e.key === "-") {
            e.preventDefault();
            zoomCanvas(stage, -ZOOM_SPEED)
        }
        if (e.shiftKey && e.key === "ArrowUp") {
            e.preventDefault();
            stage.y(stage.y() + PAN_SPEED);
        }
        if (e.shiftKey && e.key === "ArrowDown") {
            e.preventDefault();
            stage.y(stage.y() - PAN_SPEED);
        }
        if (e.shiftKey && e.key === "ArrowLeft") {
            e.preventDefault();
            stage.x(stage.x() + PAN_SPEED);
        }
        if (e.shiftKey && e.key === "ArrowRight") {
            e.preventDefault();
            stage.x(stage.x() - PAN_SPEED);
        }
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