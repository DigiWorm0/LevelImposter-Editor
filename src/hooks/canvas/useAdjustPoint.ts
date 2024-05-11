import React from "react";
import { UNITY_SCALE } from "../../types/generic/Constants";
import Point from "../../types/generic/Point";
import { useSelectedElemValue } from "../map/elements/useSelectedElem";

export default function useAdjustPoint() {
    const selectedElem = useSelectedElemValue();

    const { x, y, xScale, yScale, rotation } = selectedElem || {
        x: 0,
        y: 0,
        xScale: 1,
        yScale: 1,
        rotation: 0
    };

    /**
     * Adjusts a point relative to the selected element's position, scale, and rotation
     * @param point The point to adjust
     */
    const relativeToAbsolute = React.useCallback((point: Point) => {
        const px = point.x * xScale;
        const py = -point.y * yScale;

        const cos = Math.cos((Math.PI / 180) * rotation);
        const sin = Math.sin((Math.PI / 180) * rotation);

        const nx = ((px * cos - py * sin) + x) * UNITY_SCALE;
        const ny = ((px * sin + py * cos) + y) * UNITY_SCALE;

        return { x: nx, y: -ny };
    }, [x, y, xScale, yScale, rotation]);

    /**
     * Adjusts a point relative to the selected element's position, scale, and rotation
     * @param point The point to adjust
     * @returns The adjusted point
     */
    const absoluteToRelative = React.useCallback((point: Point) => {
        const px = point.x / UNITY_SCALE;
        const py = -point.y / UNITY_SCALE;

        const cos = Math.cos((Math.PI / 180) * -rotation);
        const sin = Math.sin((Math.PI / 180) * -rotation);

        const nx = ((px - x) * cos - (py - y) * sin) / xScale;
        const ny = ((px - x) * sin + (py - y) * cos) / yScale;

        return { x: nx, y: -ny };
    }, [x, y, xScale, yScale, rotation]);

    return { relativeToAbsolute, absoluteToRelative };
}