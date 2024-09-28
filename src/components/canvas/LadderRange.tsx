import {Shape} from "react-konva";
import {useSelectedElemValue} from "../../hooks/elements/useSelectedElem";
import {DEFAULT_LADDER_HEIGHTS, DEFAULT_LADDER_OFFSET, LADDER_RADIUS, UNITY_SCALE} from "../../types/generic/Constants";
import {useSelectedElemPropValue} from "../../hooks/elements/useSelectedElemProperty";

export default function LadderRange() {
    const selectedElem = useSelectedElemValue();
    const ladderOffset = useSelectedElemPropValue("ladderOffset");

    if (!selectedElem || !selectedElem?.type.startsWith("util-ladder"))
        return null;

    const height = selectedElem?.properties.ladderHeight ?? DEFAULT_LADDER_HEIGHTS[selectedElem.type];
    const offset = ladderOffset ?? DEFAULT_LADDER_OFFSET;
    const topOffset = height + offset;
    const bottomOffset = -height + offset;

    return (
        <>
            <Shape
                sceneFunc={(ctx, shape) => {

                    const drawCircle = (isTop: boolean) => {
                        const yOffset = isTop ? topOffset : bottomOffset;
                        ctx.arc(
                            selectedElem.x * UNITY_SCALE,
                            -(selectedElem.y + yOffset) * UNITY_SCALE,
                            LADDER_RADIUS * UNITY_SCALE,
                            0,
                            Math.PI * 2,
                            false
                        );
                    };

                    ctx.beginPath();
                    drawCircle(true);
                    ctx.closePath();
                    ctx.fillStrokeShape(shape);

                    ctx.beginPath();
                    drawCircle(false);
                    ctx.closePath();
                    ctx.fillStrokeShape(shape);

                    ctx.beginPath();
                    ctx.moveTo(
                        selectedElem.x * UNITY_SCALE,
                        -(selectedElem.y + topOffset) * UNITY_SCALE
                    );
                    ctx.lineTo(
                        selectedElem.x * UNITY_SCALE,
                        -(selectedElem.y + bottomOffset) * UNITY_SCALE
                    );
                    ctx.closePath();
                    ctx.strokeShape(shape);
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