import { Shape } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { useSelectedVentConnections } from "../../hooks/jotai/useVents";

const UNITY_SCALE = 100;

export default function VentConnections() {
    const selectedElem = useSelectedElemValue();
    const selectedElemConnections = useSelectedVentConnections();

    if (!selectedElem)
        return null;
    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                selectedElemConnections.forEach((vent) => {
                    if (!vent)
                        return;
                    ctx.moveTo(selectedElem.x * UNITY_SCALE, -selectedElem.y * UNITY_SCALE);
                    ctx.lineTo(vent.x * UNITY_SCALE, -vent.y * UNITY_SCALE);
                });
                ctx.closePath();
                ctx.fillStrokeShape(shape);

            }}
            stroke="blue"
            strokeWidth={3}
            listening={false}
        />
    );
}