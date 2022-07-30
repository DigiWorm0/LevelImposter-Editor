import { Shape } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_LADDER_HEIGHTS, UNITY_SCALE } from "../../types/generic/Constants";

export default function LadderRange() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem || !selectedElem?.type.startsWith("util-ladder"))
        return null;

    const radius = selectedElem?.properties.range ? selectedElem.properties.range : 1;
    const angle = selectedElem?.properties.onlyFromBelow ? Math.PI : Math.PI * 2;
    const height = selectedElem?.properties.ladderHeight ? selectedElem.properties.ladderHeight : DEFAULT_LADDER_HEIGHTS[selectedElem.type];

    return (
        <>
            {Array.from({ length: 2 }, (_, i) => (
                <Shape
                    sceneFunc={(ctx, shape) => {
                        const yOffset = i === 0 ? height : -height;
                        ctx.beginPath();
                        ctx.arc(
                            selectedElem.x * UNITY_SCALE,
                            -(selectedElem.y + yOffset) * UNITY_SCALE,
                            radius * UNITY_SCALE,
                            0,
                            angle,
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
            ))}
        </>
    );
}