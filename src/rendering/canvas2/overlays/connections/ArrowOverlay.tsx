import React from "react";
import GUID from "@shared/types/GUID";
import useMapElementRef from "../../element/useMapElementRef";
import {Graphics} from "pixi.js";
import Vector2 from "../../../../shared/types/Vector2";
import TickingGraphics from "../../common/TickingGraphics";
import screenToWorld from "@editor/viewport/screenToWorld";
import {useAtomValue} from "jotai";
import {settingsAtom} from "@editor/settings/settingsStore";

export interface ArrowOverlayProps {
    fromID: GUID;
    toID: GUID;
    arrowHeadPos: "to" | "from";
    offset: number;
    color: number;
}

export default function ArrowOverlay(props: ArrowOverlayProps) {
    const fromRef = useMapElementRef(props.fromID);
    const toRef = useMapElementRef(props.toID);
    const settings = useAtomValue(settingsAtom);

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
            .stroke({color, width: settings.connectionArrowWidth, alignment: 0.5, cap: "round"});

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
        const arrowHeadSize = settings.connectionArrowHeadSize;

        g.moveTo(
            pos.x - arrowHeadSize * Math.cos(angle),
            pos.y - arrowHeadSize * Math.sin(angle)
        )
            .lineTo(
                pos.x + arrowHeadSize * Math.cos(angle - Math.PI / 3),
                pos.y + arrowHeadSize * Math.sin(angle - Math.PI / 3)
            )
            .lineTo(
                pos.x + arrowHeadSize * Math.cos(angle + Math.PI / 3),
                pos.y + arrowHeadSize * Math.sin(angle + Math.PI / 3)
            )
            .fill(color);

        g.closePath();
    };

    return (
        <TickingGraphics
            draw={(g) => {
                if (!fromRef.current ||
                    !toRef.current)
                    return;

                const fromScreenPos = fromRef.current.getGlobalPosition();
                const toScreenPos = toRef.current.getGlobalPosition();

                const fromWorldPos = screenToWorld(fromScreenPos);
                const toWorldPos = screenToWorld(toScreenPos);

                const deltaWorldPos = {
                    x: toWorldPos.x - fromWorldPos.x,
                    y: toWorldPos.y - fromWorldPos.y,
                };

                g.clear();
                drawArrow(
                    g,
                    {x: 0, y: 0},   // <-- "from" is always centered on the current element (0,0)
                    deltaWorldPos, // <-- "to" is relative to "from" (delta)
                    props.arrowHeadPos,
                    props.color
                );
            }}
        />
    );
}