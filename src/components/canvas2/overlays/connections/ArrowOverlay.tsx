import React from "react";
import GUID from "../../../../types/common/GUID";
import useMapElementRef from "../../../../hooks/canvas/useMapElementRef";
import {Graphics} from "pixi.js";
import {useTick} from "@pixi/react";
import useScreenToWorld from "../../../../hooks/canvas/useScreenToWorld";
import Vector2 from "../../../../types/transform/Vector2";

export interface ArrowOverlayProps {
    fromID: GUID;
    toID: GUID;
    arrowHeadPos: "to" | "from";
    offset: number;
    color: number;
}

const ARROW_HEAD_SIZE = 10;

export default function ArrowOverlay(props: ArrowOverlayProps) {
    const fromRef = useMapElementRef(props.fromID);
    const toRef = useMapElementRef(props.toID);
    const graphicsRef = React.useRef<Graphics>(null);
    const screenToWorld = useScreenToWorld();

    useTick(() => {
        if (!fromRef.current ||
            !toRef.current ||
            !graphicsRef.current)
            return;

        const fromScreenPos = fromRef.current.getGlobalPosition();
        const toScreenPos = toRef.current.getGlobalPosition();

        const fromWorldPos = screenToWorld(fromScreenPos);
        const toWorldPos = screenToWorld(toScreenPos);

        const deltaWorldPos = {
            x: toWorldPos.x - fromWorldPos.x,
            y: toWorldPos.y - fromWorldPos.y,
        };

        const g = graphicsRef.current;

        g.clear();
        drawArrow(
            g,
            {x: 0, y: 0},
            deltaWorldPos,
            props.arrowHeadPos,
            props.color
        );
    });

    const drawArrow = (
        g: Graphics,
        from: Vector2,
        to: Vector2,
        arrowHeadPos: "to" | "from",
        color: number,
    ) => {
        const delta = {
            x: to.x - from.x,
            y: to.y - from.y,
        };
        const angle = Math.atan2(delta.y, delta.x);

        // Apply offset perpendicular to the arrow direction
        const xOffset = (props.offset ?? 0) * Math.cos(angle + Math.PI / 2);
        const yOffset = (props.offset ?? 0) * Math.sin(angle + Math.PI / 2);

        from.x += xOffset;
        from.y += yOffset;
        to.x += xOffset;
        to.y += yOffset;

        g.beginPath();

        // Line
        g.moveTo(from.x, from.y)
            .lineTo(to.x, to.y)
            .stroke({color, width: 6, alignment: 0.5, cap: "round"});

        // Arrow Head
        if (arrowHeadPos === "to")
            drawArrowHead(g, to, angle + Math.PI, color);
        else
            drawArrowHead(g, from, angle, color);

    };

    const drawArrowHead = (
        g: Graphics,
        pos: Vector2,
        angle: number,
        color: number,
    ) => {

        // Arrow Head
        g.moveTo(
            pos.x - ARROW_HEAD_SIZE * Math.cos(angle),
            pos.y - ARROW_HEAD_SIZE * Math.sin(angle)
        )
            .lineTo(
                pos.x + ARROW_HEAD_SIZE * Math.cos(angle - Math.PI / 3),
                pos.y + ARROW_HEAD_SIZE * Math.sin(angle - Math.PI / 3)
            )
            .lineTo(
                pos.x + ARROW_HEAD_SIZE * Math.cos(angle + Math.PI / 3),
                pos.y + ARROW_HEAD_SIZE * Math.sin(angle + Math.PI / 3)
            )
            .fill(color);

        g.closePath();
    };

    return (
        <pixiGraphics
            eventMode={"none"}
            ref={graphicsRef}
            draw={() => {
            }}
        />
    );
}