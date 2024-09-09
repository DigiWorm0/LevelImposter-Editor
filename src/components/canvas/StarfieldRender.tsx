import React from "react";
import {Line} from "react-konva";
import useAdjustPoint from "../../hooks/canvas/useAdjustPoint";
import {DEFAULT_STARFIELD_HEIGHT, DEFAULT_STARFIELD_LENGTH} from "../../types/generic/Constants";
import useIsSelectedElemType from "../../hooks/elements/useSelectedElemIsType";
import {useSelectedElemPropValue} from "../../hooks/elements/useSelectedElemProperty";

export default function StarfieldRender() {
    const {relativeToAbsolute} = useAdjustPoint();
    const isStarfield = useIsSelectedElemType("util-starfield");
    const starfieldHeight = useSelectedElemPropValue("starfieldHeight") ?? DEFAULT_STARFIELD_HEIGHT;
    const starfieldLength = useSelectedElemPropValue("starfieldLength") ?? DEFAULT_STARFIELD_LENGTH;

    const rectPoints = React.useMemo(() => {
        const topLeftPoint = relativeToAbsolute({x: -starfieldLength, y: -starfieldHeight / 2});
        const topRightPoint = relativeToAbsolute({x: 0, y: -starfieldHeight / 2});
        const bottomLeftPoint = relativeToAbsolute({x: -starfieldLength, y: starfieldHeight / 2});
        const bottomRightPoint = relativeToAbsolute({x: 0, y: starfieldHeight / 2});

        return [
            topLeftPoint.x, topLeftPoint.y,
            topRightPoint.x, topRightPoint.y,
            bottomRightPoint.x, bottomRightPoint.y,
            bottomLeftPoint.x, bottomLeftPoint.y,
        ];
    }, [relativeToAbsolute, starfieldHeight, starfieldLength]);

    console.log(rectPoints);

    if (!isStarfield)
        return null;
    return (
        <Line
            points={rectPoints}
            closed
            stroke="#ffaa00"
            strokeWidth={4}
            dashEnabled={true}
            dash={[10, 10]}
            listening={false}
        />
    );
}