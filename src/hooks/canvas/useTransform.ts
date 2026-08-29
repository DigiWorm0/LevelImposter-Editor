import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/types/common/GUID";
import {atom, useAtomValue} from "jotai";
import {Matrix} from "pixi.js";
import Transform2D from "../../types/transform/Transform2D";
import degToRad from "../../utils/common/degToRad";

import {elementAtomFamily} from "@editor/documentStore";

export const transformAtomFamily = atomFamily((elementID: MaybeGUID) => atom((get) => {
    // Retrieve the element using the elementID
    const element = get(elementAtomFamily(elementID));
    if (!element)
        return undefined;

    // If the element has a parent, apply its transformation matrix
    const matrix = new Matrix();
    if (element.parentID) {
        const parentTransform = get(transformAtomFamily(element.parentID));
        if (parentTransform)
            matrix.append(parentTransform.matrix);
    }

    // Calculate the transformation matrix for the element
    matrix.translate(element.x, element.y);
    matrix.rotate(degToRad(element.rotation));
    matrix.scale(element.xScale, element.yScale);

    const invertedMatrix = matrix.clone();
    invertedMatrix.invert();

    return {
        // Local properties
        localPosition: {x: element.x, y: element.y, z: 0},
        localScale: {x: element.xScale, y: element.yScale},
        localRotation: element.rotation,

        // Global properties
        position: {x: invertedMatrix.tx, y: invertedMatrix.ty, z: 0},
        scale: {x: invertedMatrix.a, y: invertedMatrix.d},
        rotation: Math.atan2(invertedMatrix.b, invertedMatrix.a),

        // Matrix representation
        matrix
    } as Transform2D;
}));

export default function useTransform(elementID: MaybeGUID) {
    return useAtomValue(transformAtomFamily(elementID));
}