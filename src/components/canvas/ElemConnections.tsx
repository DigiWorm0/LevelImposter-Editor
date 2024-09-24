import { Context } from "konva/lib/Context";
import { Shape } from "react-konva";
import { useSelectedConnections } from "../../hooks/elements/useConnections";
import { useSelectedElemValue } from "../../hooks/elements/useSelectedElem";
import { UNITY_SCALE } from "../../types/generic/Constants";
import LIElement from "../../types/li/LIElement";
import { useSettingsValue } from "../../hooks/useSettings";

export default function ElemConnections() {
    const selectedElem = useSelectedElemValue();
    const [targetConnections, sourceConnections] = useSelectedConnections();
    const { connectionsPreview } = useSettingsValue();

    const drawArrow = (from: LIElement, to: LIElement, offset: number, ctx: Context) => {
        const x1 = from.x * UNITY_SCALE;
        const y1 = -from.y * UNITY_SCALE;
        const x2 = to.x * UNITY_SCALE;
        const y2 = -to.y * UNITY_SCALE;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
        const arrowSize = 20;
        const circleSize = 5;
        const xOffset = offset * Math.cos(angle + Math.PI / 2);
        const yOffset = offset * Math.sin(angle + Math.PI / 2);

        ctx.beginPath();
        ctx.arc(
            x1 + xOffset,
            y1 + yOffset,
            circleSize,
            0,
            2 * Math.PI,
            false
        );
        ctx.moveTo(x1 + xOffset, y1 + yOffset);
        ctx.lineTo(x2 + xOffset, y2 + yOffset);
        ctx.moveTo(
            x2 - arrowSize * Math.cos(angle - Math.PI / 6) + xOffset,
            y2 - arrowSize * Math.sin(angle - Math.PI / 6) + yOffset
        );
        ctx.lineTo(x2 + xOffset, y2 + yOffset);
        ctx.lineTo(
            x2 - arrowSize * Math.cos(angle + Math.PI / 6) + xOffset,
            y2 - arrowSize * Math.sin(angle + Math.PI / 6) + yOffset
        );

        ctx.closePath();
    };

    if (!selectedElem || !connectionsPreview)
        return null;

    return (
        <>
            <Shape
                sceneFunc={(ctx, shape) => {
                    sourceConnections.forEach((elem) => {
                        if (!elem)
                            return;
                        drawArrow(elem, selectedElem, 5, ctx,);
                        ctx.fillStrokeShape(shape);
                    });
                }}
                stroke="#215DB0"
                strokeWidth={4}
                fill="#215DB0"

                shadowColor="black"
                shadowBlur={10}
                shadowOffsetX={0}
                shadowOffsetY={0}
                shadowOpacity={0.5}

                listening={false}
            />
            <Shape
                sceneFunc={(ctx, shape) => {
                    targetConnections.forEach((elem) => {
                        if (!elem)
                            return;
                        drawArrow(selectedElem, elem, 5, ctx);
                        ctx.fillStrokeShape(shape);
                    });
                }}
                stroke="#AC2F33"
                strokeWidth={4}
                fill="#AC2F33"

                shadowColor="black"
                shadowBlur={10}
                shadowOffsetX={0}
                shadowOffsetY={0}
                shadowOpacity={0.5}

                listening={false}
            />
        </>
    );
}