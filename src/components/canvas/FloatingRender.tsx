import React from "react";
import { Line } from "react-konva";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import { DEFAULT_FLOATING_HEIGHT } from "../../types/generic/Constants";
import useAdjustPoint from "../../hooks/canvas/useAdjustPoint";

export default function FloatingRender() {
    const selectedElem = useSelectedElemValue();
    const { relativeToAbsolute } = useAdjustPoint();

    const linePoints = React.useMemo(() => {
        const height = selectedElem?.properties.floatingHeight ?? DEFAULT_FLOATING_HEIGHT;

        const topPoint = relativeToAbsolute({ x: 0, y: -height });
        const bottomPoint = relativeToAbsolute({ x: 0, y: 0 });

        return [
            topPoint.x, topPoint.y,
            bottomPoint.x, bottomPoint.y,
        ];
    }, [selectedElem, relativeToAbsolute]);

    if (!selectedElem)
        return null;
    if (selectedElem.type !== "util-blankfloat")
        return null;
    
    return (
        <Line
            points={linePoints}
            stroke="#ffaa00"
            strokeWidth={4}
            lineCap="round"
            listening={false}
        />
    );
}