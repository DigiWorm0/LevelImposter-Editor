import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import getCenter from "../../utils/math/getCenter";
import getDistance from "../../utils/math/getDistance";
import Point from "../../types/generic/Point";

export default function useCameraTouchControl(stageRef: React.RefObject<Konva.Stage>) {
    let lastCenter: Point | null = null;
    let lastDist = 0;

    // Move Event
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

            // Save Last Center/Distance
            lastDist = dist;
            lastCenter = newCenter;
        }
    }, []);

    // End Event
    const onTouchEnd = React.useCallback((e: KonvaEventObject<TouchEvent>) => {
        lastCenter = null;
        lastDist = 0;

        e.target.getStage()?.stopDrag();
        e.evt.preventDefault();
    }, []);

    // Assign Events
    React.useEffect(() => {
        const stage = stageRef.current;
        if (!stage)
            return () => {
            };

        stage.on("touchmove", onTouchMove);
        stage.on("touchend", onTouchEnd);

        return () => {
            stage.off("touchmove", onTouchMove);
            stage.off("touchend", onTouchEnd);
        };
    }, []);
}