import React from "react";
import { Rect, Shape } from "react-konva";
import { useSetMouseCursor } from "../../hooks/input/useMouse";
import useSelectedCollider, { useInsertPointAtMouse } from "../../hooks/map/elements/useSelectedCollider";
import { useSettingsValue } from "../../hooks/useSettings";
import useAdjustPoint from "../../hooks/canvas/useAdjustPoint";
import { UNITY_SCALE } from "../../types/generic/Constants";
import Point from "../../types/generic/Point";


export default function ColliderEditor() {
    const [collider, setCollider] = useSelectedCollider();
    const setMouseCursor = useSetMouseCursor();
    const insertPointAtMouse = useInsertPointAtMouse();
    const { gridSnapResolution, colliderHandleSize, isGridSnapEnabled } = useSettingsValue();
    const { relativeToAbsolute, absoluteToRelative } = useAdjustPoint();

    // Snap the point to the grid
    const snapPointToGrid = React.useCallback((p: Point) => {
        const scaledPoint = {
            x: p.x / UNITY_SCALE,
            y: p.y / UNITY_SCALE
        };
        const snapPoint = {
            x: Math.round(scaledPoint.x / gridSnapResolution) * gridSnapResolution,
            y: Math.round(scaledPoint.y / gridSnapResolution) * gridSnapResolution
        };
        return {
            x: snapPoint.x * UNITY_SCALE,
            y: snapPoint.y * UNITY_SCALE
        };
    }, [gridSnapResolution]);

    if (!collider || collider.points.length <= 0)
        return null;

    return (
        <>
            {collider.points.map((p, index) => {
                let pointIndex = (index + 1) % collider.points.length;
                if (pointIndex == 0 && !collider.isSolid)
                    pointIndex = index;

                return (
                    <Shape
                        key={collider.id + "-" + index}
                        sceneFunc={(ctx, shape) => {
                            const p1 = relativeToAbsolute(p);
                            const p2 = relativeToAbsolute(collider.points[pointIndex]);

                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.fillStrokeShape(shape);
                        }}
                        onMouseEnter={() => setMouseCursor("pointer")}
                        onMouseLeave={() => setMouseCursor("default")}
                        stroke={collider.blocksLight ? "red" : "green"}
                        strokeWidth={5}
                        onMouseDown={() => {
                            insertPointAtMouse(index + 1);
                        }}
                    />
                )
            })}

            {collider.points.map((p, index) => {
                const p1 = relativeToAbsolute(p);
                return (
                    <Rect
                        key={collider.id + "-" + index}
                        x={p1.x - colliderHandleSize / 2}
                        y={p1.y - colliderHandleSize / 2}
                        width={colliderHandleSize}
                        height={colliderHandleSize}
                        strokeWidth={colliderHandleSize / 8}
                        fill={"blue"}
                        stroke={"white"}
                        onMouseDown={(e) => {
                            if (e.evt.button === 2 && collider.points.length > 2) {
                                collider.points.splice(index, 1);
                                setCollider({ ...collider });
                            }
                        }}
                        onMouseEnter={() => {
                            setMouseCursor("pointer");
                        }}
                        onMouseLeave={() => {
                            setMouseCursor("default");
                        }}
                        onDragMove={(e) => {
                            if (isGridSnapEnabled) {
                                const snapPoint = snapPointToGrid({
                                    x: e.target.x() + colliderHandleSize / 2,
                                    y: e.target.y() + colliderHandleSize / 2
                                });
                                e.target.position({
                                    x: snapPoint.x - colliderHandleSize / 2,
                                    y: snapPoint.y - colliderHandleSize / 2
                                });
                            }

                            const targetX = e.target.x() + colliderHandleSize / 2;
                            const targetY = e.target.y() + colliderHandleSize / 2;
                            const relative = absoluteToRelative({ x: targetX, y: targetY });
                            p.x = relative.x;
                            p.y = relative.y;
                        }}
                        onDragEnd={() => {
                            setCollider({ ...collider, points: collider.points.map((p) => ({ ...p })) });
                        }}
                        draggable
                    />
                );
            })}
        </>
    );
}