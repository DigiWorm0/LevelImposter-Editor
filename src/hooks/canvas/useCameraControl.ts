import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import useWindowSize from "./useWindowSize";
import Camera from "../../types/generic/Camera";

const ZOOM_SPEED = 1.002;
const DEFAULT_CAMERA: Camera = { x: 0, y: 0, scale: 1 };

export default function useCameraControl() {
    const [windowWidth, windowHeight] = useWindowSize();
    const stageRef = React.useRef<Konva.Stage>(null);
    const layerRef = React.useRef<Konva.Layer>(null);

    // Utility Functions
    const getCamera = React.useCallback(() => {
        const stage = stageRef.current;
        const layer = layerRef.current;
        if (!stage || !layer)
            return DEFAULT_CAMERA;

        return {
            x: stage.x(),
            y: stage.y(),
            scale: layer.scaleX(),
        };
    }, []);
    const setCamera = React.useCallback((camera: { x: number, y: number, scale: number }) => {
        const stage = stageRef.current;
        const layer = layerRef.current;
        if (!stage || !layer)
            return;

        stage.x(camera.x);
        stage.y(camera.y);
        layer.scaleX(camera.scale);
        layer.scaleY(camera.scale);
    }, []);
    const zoom = React.useCallback((delta: number, mouseX?: number, mouseY?: number) => {

        // Get current camera
        const camera = getCamera();

        // Calculate new scale
        const newScale = camera.scale * Math.pow(ZOOM_SPEED, -delta);
        const zoomDelta = newScale / camera.scale;

        // Calculate Mouse Offset
        const mouseOffsetX = mouseX ? (mouseX - windowWidth / 2) : 0;
        const mouseOffsetY = mouseY ? (mouseY - windowHeight / 2) : 0;

        // Calculate new position
        const newX = camera.x - (mouseOffsetX - camera.x) * (zoomDelta - 1);
        const newY = camera.y - (mouseOffsetY - camera.y) * (zoomDelta - 1);

        // Set new camera
        setCamera({ x: newX, y: newY, scale: newScale });

    }, [getCamera, setCamera, windowWidth, windowHeight]);

    // Zoom
    const onScroll = React.useCallback((e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        zoom(e.evt.deltaY, e.evt.clientX, e.evt.clientY);
    }, [zoom]);

    // Start/Stop Pan
    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 2) {
            e.target.stopDrag();
            e.target.getStage()?.startDrag();
            e.evt.preventDefault();
        }
    }, []);
    const onMouseUp = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 2) {
            e.target.getStage()?.stopDrag();
            e.evt.preventDefault();
        }
    }, []);

    // Touch Events
    const onTouchStart = React.useCallback((e: KonvaEventObject<TouchEvent>) => {
        e.target.stopDrag();
        e.target.getStage()?.startDrag();
        e.evt.preventDefault();
    }, []);
    const onTouchEnd = React.useCallback((e: KonvaEventObject<TouchEvent>) => {
        e.target.getStage()?.stopDrag();
        e.evt.preventDefault();
    }, []);

    // Prevent Right Click
    const onContextMenu = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
    }, []);

    // Keybinds
    const onKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "=") {
            e.preventDefault();
            zoom(-100);
        }
        if (e.ctrlKey && e.key === "-") {
            e.preventDefault();
            zoom(100);
        }
    }, [zoom]);

    React.useEffect(() => {
        Konva.dragButtons = [0, 1, 2];
        Konva.hitOnDragEnabled = true;

        // Assign Events
        const stage = stageRef.current;
        if (!stage)
            return () => {
            };

        stage.on("wheel", onScroll);
        stage.on("mousedown", onMouseDown);
        stage.on("mouseup", onMouseUp);
        stage.on("contextmenu", onContextMenu);
        stage.on("touchstart", onTouchStart);
        stage.on("touchend", onTouchEnd);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            stage.off("wheel", onScroll);
            stage.off("mousedown", onMouseDown);
            stage.off("mouseup", onMouseUp);
            stage.off("contextmenu", onContextMenu);
            stage.off("touchstart", onTouchStart);
            stage.off("touchend", onTouchEnd);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onScroll, onMouseDown, onMouseUp, onContextMenu, onKeyDown]);

    return {
        stageRef,
        layerRef
    };
}