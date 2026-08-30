import {getSelectedCollider} from "./getSelectedCollider";
import {EditorCommand} from "../../history/executeCommand";

export const deleteColliderPoint = (pointIndex: number): EditorCommand => map => {
    const selectedCollider = getSelectedCollider(map);
    if (!selectedCollider)
        throw new Error("No collider selected");

    if (pointIndex < 0 || pointIndex >= selectedCollider.points.length)
        throw new Error("Point index out of bounds");

    selectedCollider.points.splice(pointIndex, 1);
};