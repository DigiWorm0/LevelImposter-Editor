import {atom, useSetAtom} from "jotai";
import {UNITY_SCALE} from "../../types/generic/Constants";
import Point from "../../types/generic/Point";
import {selectedElementAtom} from "../elements/useSelectedElem";
import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/generic/GUID";
import {elementFamilyAtom} from "../elements/useElements";

export const relativeToAbsoluteAtomFamily = atomFamily((elemID: MaybeGUID) => {
    return atom(null, (get, _, point: Point) => {
        // Get Element
        const elem = elemID ? get(elementFamilyAtom(elemID)) : get(selectedElementAtom);

        // Get Element Transform
        const {x, y, xScale, yScale, rotation} = elem || {x: 0, y: 0, xScale: 1, yScale: 1, rotation: 0};

        // Scale and Rotate Point
        const px = point.x * xScale;
        const py = -point.y * yScale;

        const cos = Math.cos((Math.PI / 180) * rotation);
        const sin = Math.sin((Math.PI / 180) * rotation);

        const nx = ((px * cos - py * sin) + x) * UNITY_SCALE;
        const ny = ((px * sin + py * cos) + y) * UNITY_SCALE;

        return {x: nx, y: -ny};
    });
});

export const absoluteToRelativeAtomFamily = atomFamily((elemID: MaybeGUID) => {
    return atom(null, (get, _, point: Point) => {
        // Get Element
        const elem = elemID ? get(elementFamilyAtom(elemID)) : get(selectedElementAtom);

        // Get Element Transform
        const {x, y, xScale, yScale, rotation} = elem || {x: 0, y: 0, xScale: 1, yScale: 1, rotation: 0};

        // Scale and Rotate Point
        const px = point.x / UNITY_SCALE;
        const py = -point.y / UNITY_SCALE;

        const cos = Math.cos((Math.PI / 180) * -rotation);
        const sin = Math.sin((Math.PI / 180) * -rotation);

        const nx = ((px - x) * cos - (py - y) * sin) / xScale;
        const ny = ((px - x) * sin + (py - y) * cos) / yScale;

        return {x: nx, y: -ny};
    });
});

export default function useAdjustPoint(elemID?: MaybeGUID) {
    const relativeToAbsolute = useSetAtom(relativeToAbsoluteAtomFamily(elemID));
    const absoluteToRelative = useSetAtom(absoluteToRelativeAtomFamily(elemID));

    return {relativeToAbsolute, absoluteToRelative};
}