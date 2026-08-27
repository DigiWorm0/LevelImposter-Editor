import {MapCommand} from "../../history/executeCommand";
import {getSelectedCollider} from "../helpers/getSelectedCollider";

export const setColliderPointsLength = (length: number): MapCommand => map => {
    const collider = getSelectedCollider(map);
    if (!collider)
        return;

    // If the current number of points is greater than the desired length, remove points from the end of the array
    const points = collider.points;
    if (length < points.length) {
        points.splice(length);
        return;
    }

    // Add (0, 0) points to the end of the array until it reaches the desired length
    for (let i = points.length; i < length; i++)
        points.push({x: 0, y: 0});
};