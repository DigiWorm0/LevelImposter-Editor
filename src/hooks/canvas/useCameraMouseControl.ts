import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { UNITY_SCALE } from "../../types/generic/Constants";
import useSetMouse from "../input/useMouse";
import zoomCanvas from "../../utils/canvas/zoomCanvas";
import useUpdateCameraPos from "./useCameraPos";

export default function useCameraMouseControl(stageRef: React.RefObject<Konva.Stage>) {
    const updateCameraPos = useUpdateCameraPos(stageRef);
    const setMouse = useSetMouse();

    // Zoom
    const onScroll = React.useCallback((e: KonvaEventObject<WheelEvent>) => {
        const stage = stageRef.current;
        if (!stage)
            return;

        e.evt.preventDefault();
        zoomCanvas(stage, -e.evt.deltaY);
        updateCameraPos();
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
    const onMouseMove = React.useCallback(() => {
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
        updateCameraPos();
    }, [setMouse]);

    // Prevent Right Click
    const onContextMenu = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
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

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            stage.off("wheel", onScroll);
            stage.off("mousedown", onMouseDown);
            stage.off("mouseup", onMouseUp);
            stage.off("contextmenu", onContextMenu);
        };
    }, [onScroll, onMouseDown, onMouseUp, onMouseMove, onContextMenu, stageRef]);
}