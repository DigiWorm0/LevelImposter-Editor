import { Shape } from "react-konva";
import { useElementValue } from "../../hooks/jotai/useElement";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";

const UNITY_SCALE = 100;

export default function TaskParent() {
    const selectedElem = useSelectedElemValue();
    const selectedParent = useElementValue(selectedElem?.properties.parent);

    if (!selectedElem || !selectedParent)
        return null;
    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                ctx.moveTo(selectedElem.x * UNITY_SCALE, -selectedElem.y * UNITY_SCALE);
                ctx.lineTo(selectedParent.x * UNITY_SCALE, -selectedParent.y * UNITY_SCALE);
                ctx.closePath();
                ctx.fillStrokeShape(shape);
            }}
            stroke="blue"
            strokeWidth={3}
            listening={false}
        />
    );
}