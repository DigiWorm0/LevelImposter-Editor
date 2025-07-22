import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {useConnections} from "../../../hooks/elements/useConnections";
import LIElement from "../../../types/li/LIElement";
import {UNITY_SCALE} from "../../../types/amongus/Constants";
import {Graphics} from "pixi.js";
import {useSettingsValue} from "../../../hooks/useSettings";

export interface ConnectionOverlayProps {
    elementID: GUID;
}

export default function ConnectionOverlay(props: ConnectionOverlayProps) {
    const element = useElementValue(props.elementID);
    const [targetConnections, sourceConnections] = useConnections(props.elementID);
    const settings = useSettingsValue();

    const drawArrow = (
        to: LIElement,
        g: Graphics,
        color: number,
        direction: "to" | "from",
    ) => {
        if (!element || !to)
            return;

        // Calculate positions
        const x1 = element.x * UNITY_SCALE;
        const y1 = -element.y * UNITY_SCALE;
        const x2 = to.x * UNITY_SCALE;
        const y2 = -to.y * UNITY_SCALE;

        const dx = x2 - x1;
        const dy = y2 - y1;

        let fromX = direction === "from" ? dx : 0;
        let fromY = direction === "from" ? dy : 0;
        let toX = direction === "to" ? dx : 0;
        let toY = direction === "to" ? dy : 0;

        const angle = Math.atan2(fromY - toY, fromX - toX);
        const arrowSize = 10;
        const offset = 6;
        const xOffset = offset * Math.cos(angle + Math.PI / 2);
        const yOffset = offset * Math.sin(angle + Math.PI / 2);

        fromX += xOffset;
        fromY += yOffset;
        toX += xOffset;
        toY += yOffset;

        g.beginPath();

        // Line
        g.moveTo(fromX, fromY)
            .lineTo(toX, toY)
            .stroke({color, width: 6, alignment: 0.5, cap: "round"});


        // Arrow Head
        g.moveTo(
            toX - arrowSize * Math.cos(angle),
            toY - arrowSize * Math.sin(angle)
        )
            .lineTo(
                toX + arrowSize * Math.cos(angle - Math.PI / 3),
                toY + arrowSize * Math.sin(angle - Math.PI / 3)
            )
            .lineTo(
                toX + arrowSize * Math.cos(angle + Math.PI / 3),
                toY + arrowSize * Math.sin(angle + Math.PI / 3)
            )
            .fill(color);

        g.closePath();
    };

    if (!element || !settings.connectionsPreview)
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();

                // Draw source connections
                sourceConnections.forEach((connectionElement) => {
                    drawArrow(connectionElement, g, 0xAC2F33, "from");
                });

                // Draw target connections
                targetConnections.forEach((connectionElement) => {
                    drawArrow(connectionElement, g, 0x215DB0, "to");
                });
            }}
        />
    );
}