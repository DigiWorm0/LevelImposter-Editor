import { Circle, Shape } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";

const UNITY_SCALE = 100;

export default function ConsoleRange() {
    const selectedElem = useSelectedElemValue();

    const radius = selectedElem?.properties.range ? selectedElem.properties.range : 1;
    const angle = selectedElem?.properties.onlyFromBelow ? Math.PI : Math.PI * 2;
    const isConsole = selectedElem?.type.startsWith("task-")
        || selectedElem?.type.startsWith("sab-")
        || selectedElem?.type.startsWith("util-button")
        || selectedElem?.type.startsWith("util-cams")
        || selectedElem?.type === "util-admin"
        || selectedElem?.type === "util-vitals"
        || selectedElem?.type === "util-computer";

    if (!selectedElem || !isConsole)
        return null;
    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();

                ctx.arc(
                    selectedElem.x * UNITY_SCALE,
                    -selectedElem.y * UNITY_SCALE,
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
    );
}