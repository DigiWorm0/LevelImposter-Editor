import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { UNITY_SCALE } from "../../types/generic/Constants";
import useSetMouse from "../input/useMouse";
import zoomCanvas from "../../utils/zoomCanvas";

export default function useCameraMouseControl(stageRef: React.RefObject<Konva.Stage>) {
    const setMouse = useSetMouse();

    // Zoom
    const onScroll = React.useCallback((e: KonvaEventObject<WheelEvent>) => {
        const stage = stageRef.current;
        if (!stage)
            return;

        e.evt.preventDefault();
        zoomCanvas(stage, -e.evt.deltaY);
    }, []);

    // Click and Drag
    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 2) {
            e.target.stopDrag();
            e.target.getStage()?.startDrag();
            e.evt.preventDefault();
        }
    }, []);
    const onMouseUp = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        const stage = stageRef.current;
        if (!stage)
            return;

        if (e.evt.button === 2) {
            stage?.stopDrag();
            e.evt.preventDefault();
        }
    }, []);
    const onMouseMove = React.useCallback((e: MouseEvent) => {
        const stage = stageRef.current;
        if (!stage)
            return;

        const mousePos = stage.getPointerPosition() ?? { x: 0, y: 0 };
        const mouseX = (mousePos.x - stage.x()) / stage.scaleX();
        const mouseY = (mousePos.y - stage.y()) / stage.scaleY();

        setMouse({
            x: mouseX / UNITY_SCALE,
            y: -mouseY / UNITY_SCALE
        });
    }, [setMouse]);

    // Prevent Right Click
    const onContextMenu = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
    }, []);

    // Keybinds
    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        const stage = stageRef.current;
        if (!stage)
            return;

        if (e.ctrlKey && e.key === "=") {
            e.preventDefault();
            zoomCanvas(stage, 100)
        }
        if (e.ctrlKey && e.key === "-") {
            e.preventDefault();
            zoomCanvas(stage, -100)
        }
    }, []);

    React.useEffect(() => {
        Konva.dragButtons = [0, 1, 2];
        Konva.hitOnDragEnabled = true;

        // Assign Events
        const stage = stageRef.current;
        if (!stage)
            return () => {
            };

        window.addEventListener("mousemove", onMouseMove);
        stage.on("wheel", onScroll);
        stage.on("mousedown", onMouseDown);
        stage.on("mouseup", onMouseUp);
        stage.on("contextmenu", onContextMenu);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            stage.off("wheel", onScroll);
            stage.off("mousedown", onMouseDown);
            stage.off("mouseup", onMouseUp);
            stage.off("contextmenu", onContextMenu);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onScroll, onMouseDown, onMouseUp, onMouseMove, onContextMenu, onKeyDown, stageRef]);
}