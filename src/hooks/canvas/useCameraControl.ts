import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { UNITY_SCALE } from "../../types/generic/Constants";
import useSetMouse from "../input/useMouse";
import { useSetCameraScale } from "./useCameraScale";

const ZOOM_SPEED = 1.002;

export default function useCameraControl() {
    const stageRef = React.useRef<Konva.Stage>(null);
    const setMouse = useSetMouse();
    const setCameraScale = useSetCameraScale();

    // Utility Functions
    const zoom = React.useCallback((delta: number) => {

        // Get Stage
        const stage = stageRef.current;
        if (!stage)
            return;

        // Get Mouse Position
        const mousePos = stage.getPointerPosition();
        if (!mousePos)
            return;

        // Calculate New Scale
        const currentScale = stage.scaleX();
        const scaleBy = Math.pow(ZOOM_SPEED, delta);
        const newScale = currentScale * scaleBy;

        // Calculate New Position
        const mousePointTo = {
            x: mousePos.x / currentScale - stage.x() / currentScale,
            y: mousePos.y / currentScale - stage.y() / currentScale,
        };
        const newPos = {
            x: mousePos.x - mousePointTo.x * newScale,
            y: mousePos.y - mousePointTo.y * newScale,
        };

        // Set New Camera Position
        stage.scale({ x: newScale, y: newScale });
        stage.position(newPos);
        setCameraScale(newScale);
    }, []);

    const getCenter = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
        };
    }
    const getDistance = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    /*
     * Mouse Events
     */
    const onScroll = React.useCallback((e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        zoom(-e.evt.deltaY);
    }, [zoom]);
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

        const mouseX = (e.clientX - stage.x()) / stage.scaleX();
        const mouseY = (e.clientY - stage.y()) / stage.scaleY();

        setMouse({
            x: mouseX / UNITY_SCALE,
            y: -mouseY / UNITY_SCALE
        });
    }, [setMouse]);

    /*
     * Touch Events
     */
    const onTouchStart = React.useCallback((e: KonvaEventObject<TouchEvent>) => {
        e.target.stopDrag();
        e.target.getStage()?.startDrag();
        e.evt.preventDefault();
    }, []);

    let lastCenter: { x: number, y: number } | null = null;
    let lastDist = 0;

    const onTouchMove = React.useCallback((e: KonvaEventObject<TouchEvent>) => {
        e.evt.preventDefault();
        const touch1 = e.evt.touches[0];
        const touch2 = e.evt.touches[1];
        const stage = e.target.getStage();

        // Ensure Stage Exists
        if (!stage)
            return;

        // Drag if only one touch
        if (touch1 && !touch2 && !stage.isDragging()) {
            stage.startDrag();
        }

        // Zoom if two touches
        if (touch1 && touch2) {
            // Stop dragging
            if (stage.isDragging()) {
                stage.stopDrag();
            }

            // Calculate center point and distance
            const p1 = {
                x: touch1.clientX,
                y: touch1.clientY,
            };
            const p2 = {
                x: touch2.clientX,
                y: touch2.clientY,
            };

            const newCenter = getCenter(p1, p2);
            const dist = getDistance(p1, p2);

            // Get Last Center/Distance
            if (!lastCenter) {
                lastCenter = newCenter;
                return; // Skip first frame
            }
            if (!lastDist)
                lastDist = dist;

            // local coordinates of center point
            const pointTo = {
                x: (newCenter.x - stage.x()) / stage.scaleX(),
                y: (newCenter.y - stage.y()) / stage.scaleX(),
            };

            // Calculate New Scale
            const scale = stage.scaleX() * (dist / lastDist);

            // Calculate Delta Position
            const dx = newCenter.x - lastCenter.x;
            const dy = newCenter.y - lastCenter.y;
            const newX = newCenter.x - pointTo.x * scale + dx;
            const newY = newCenter.y - pointTo.y * scale + dy;

            // Set New Camera Position
            stage.scale({ x: scale, y: scale });
            stage.position({ x: newX, y: newY });
            setCameraScale(scale);

            // Save Last Center/Distance
            lastDist = dist;
            lastCenter = newCenter;
        }
    }, []);
    const onTouchEnd = React.useCallback((e: KonvaEventObject<TouchEvent>) => {
        lastCenter = null;
        lastDist = 0;

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
            zoom(100);
        }
        if (e.ctrlKey && e.key === "-") {
            e.preventDefault();
            zoom(-100);
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

        window.addEventListener("mousemove", onMouseMove);
        stage.on("wheel", onScroll);
        stage.on("mousedown", onMouseDown);
        stage.on("mouseup", onMouseUp);
        stage.on("contextmenu", onContextMenu);
        stage.on("touchstart", onTouchStart);
        stage.on("touchmove", onTouchMove);
        stage.on("touchend", onTouchEnd);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            stage.off("wheel", onScroll);
            stage.off("mousedown", onMouseDown);
            stage.off("mouseup", onMouseUp);
            stage.off("contextmenu", onContextMenu);
            stage.off("touchstart", onTouchStart);
            stage.off("touchmove", onTouchMove);
            stage.off("touchend", onTouchEnd);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onScroll, onMouseDown, onMouseUp, onContextMenu, onKeyDown]);

    return stageRef;
}