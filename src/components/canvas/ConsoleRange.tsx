import { Shape } from "react-konva";
import getIsConsole from "../../hooks/utils/getIsConsole";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import {
    DEFAULT_CONSOLE_RANGE,
    DEFAULT_SPORE_RANGE,
    UNITY_SCALE,
    VENT_CONSOLE_RANGE
} from "../../types/generic/Constants";

export default function ConsoleRange() {
    const selectedElem = useSelectedElemValue();

    const isSpore = selectedElem?.type === "util-spore";
    const isVent = selectedElem?.type.startsWith("util-vent");
    const radius = selectedElem?.properties.range ?? (
        isVent ? VENT_CONSOLE_RANGE :
            isSpore ? DEFAULT_SPORE_RANGE :
                DEFAULT_CONSOLE_RANGE
    );
    const angle = selectedElem?.properties.onlyFromBelow ? Math.PI : Math.PI * 2;
    const isConsole = getIsConsole(selectedElem?.type || "");

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