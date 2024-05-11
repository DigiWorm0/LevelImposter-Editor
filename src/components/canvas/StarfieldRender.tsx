import React from "react";
import { Line } from "react-konva";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import useAdjustPoint from "../../hooks/canvas/useAdjustPoint";
import { DEFAULT_STARFIELD_HEIGHT, DEFAULT_STARFIELD_LENGTH } from "../../types/generic/Constants";

export default function StarfieldRender() {
    const selectedElem = useSelectedElemValue();
    const { relativeToAbsolute } = useAdjustPoint();

    const rectPoints = React.useMemo(() => {
        const height = selectedElem?.properties.starfieldHeight ?? DEFAULT_STARFIELD_HEIGHT;
        const length = selectedElem?.properties.starfieldLength ?? DEFAULT_STARFIELD_LENGTH;

        const topLeftPoint = relativeToAbsolute({ x: -length, y: -height / 2 });
        const topRightPoint = relativeToAbsolute({ x: 0, y: -height / 2 });
        const bottomLeftPoint = relativeToAbsolute({ x: -length, y: height / 2 });
        const bottomRightPoint = relativeToAbsolute({ x: 0, y: height / 2 });

        return [
            topLeftPoint.x, topLeftPoint.y,
            topRightPoint.x, topRightPoint.y,
            bottomRightPoint.x, bottomRightPoint.y,
            bottomLeftPoint.x, bottomLeftPoint.y,
        ];
    }, [selectedElem, relativeToAbsolute]);

    if (!selectedElem || selectedElem.type !== "util-starfield")
        return null;
    return (
        <>
            <Line
                points={rectPoints}
                closed
                stroke="#ffaa00"
                strokeWidth={4}
                dashEnabled={true}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}