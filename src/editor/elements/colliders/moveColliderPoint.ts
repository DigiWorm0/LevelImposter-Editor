import Vector2 from "../../../types/transform/Vector2";
import {getSelectedCollider} from "./getSelectedCollider";
import {MapCommand} from "../../history/executeCommand";

export const moveColliderPoint = (pointIndex: number, newPosition: Vector2): MapCommand => map => {
    const selectedCollider = getSelectedCollider(map);
    if (!selectedCollider)
        throw new Error("No collider selected");

    if (pointIndex < 0 || pointIndex >= selectedCollider.points.length)
        throw new Error("Point index out of bounds");

    selectedCollider.points[pointIndex] = newPosition;
};