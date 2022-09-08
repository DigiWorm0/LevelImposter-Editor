import { Shape } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_PLATFORM_ENTER, DEFAULT_PLATFORM_EXIT, DEFAULT_PLATFORM_OFFSET, PLATFORM_RADIUS, UNITY_SCALE } from "../../types/generic/Constants";

export default function PlatformRange() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || !selectedElem?.type.startsWith("util-platform"))
        return null;

    const {
        platformYOffset,
        platformXOffset,
        platformXEntranceOffset,
        platformYEntranceOffset,
        platformXExitOffset,
        platformYExitOffset,
    } = selectedElem.properties;


    const xOffset = platformXOffset !== undefined ? platformXOffset : DEFAULT_PLATFORM_OFFSET;
    const yOffset = platformYOffset !== undefined ? platformYOffset : 0;

    const xEntranceOffset = platformXEntranceOffset !== undefined ? platformXEntranceOffset : DEFAULT_PLATFORM_ENTER;
    const yEntranceOffset = platformYEntranceOffset !== undefined ? platformYEntranceOffset : 0;

    const xExitOffset = platformXExitOffset !== undefined ? platformXExitOffset : DEFAULT_PLATFORM_EXIT;
    const yExitOffset = platformYExitOffset !== undefined ? platformYExitOffset : 0;

    return (
        <>
            <Shape
                sceneFunc={(ctx, shape) => {
                    ctx.beginPath();
                    ctx.moveTo(
                        selectedElem.x * UNITY_SCALE,
                        -selectedElem.y * UNITY_SCALE
                    );
                    ctx.lineTo(
                        (selectedElem.x + xOffset) * UNITY_SCALE,
                        -(selectedElem.y + yOffset) * UNITY_SCALE
                    );
                    ctx.closePath();
                    ctx.strokeShape(shape);

                    ctx.beginPath();
                    ctx.arc(
                        (selectedElem.x + xEntranceOffset) * UNITY_SCALE,
                        -(selectedElem.y + yEntranceOffset) * UNITY_SCALE,
                        PLATFORM_RADIUS * UNITY_SCALE,
                        0,
                        2 * Math.PI,
                        false
                    );
                    ctx.closePath();
                    ctx.fillStrokeShape(shape);

                    ctx.beginPath();
                    ctx.arc(
                        (selectedElem.x + xExitOffset + xOffset) * UNITY_SCALE,
                        -(selectedElem.y + yExitOffset + yOffset) * UNITY_SCALE,
                        PLATFORM_RADIUS * UNITY_SCALE,
                        0,
                        2 * Math.PI,
                        false
                    );
                    ctx.closePath();
                    ctx.fillStrokeShape(shape);
                }}
                fill="#ffaa0066"
                stroke="#ffaa00ff"
                strokeWidth={4}
                dashEnabled={true}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}