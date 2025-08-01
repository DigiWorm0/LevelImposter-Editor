import Vector2 from "../../types/transform/Vector2";
import getDistanceFromPoint from "./getDistanceFromPoint";

/**
 * Calculates the distance from a point to a line segment defined by two endpoints.
 * @param point - The point from which to measure the distance.
 * @param lineStart - The starting point of the line segment.
 * @param lineEnd - The ending point of the line segment.
 * @return The shortest distance from the point to the line segment.
 */
export default function getDistanceFromLine(
    point: Vector2,
    lineStart: Vector2,
    lineEnd: Vector2) {

    // Calculate the squared length of the line segment
    const lineLengthSquared = (lineEnd.x - lineStart.x) ** 2 + (lineEnd.y - lineStart.y) ** 2;

    // Check if the line segment is a point
    if (lineLengthSquared === 0)
        return getDistanceFromPoint(point, lineStart);

    // Calculate the projection of the point onto the line segment (t)
    const t = ((point.x - lineStart.x) * (lineEnd.x - lineStart.x) +
        (point.y - lineStart.y) * (lineEnd.y - lineStart.y)) / lineLengthSquared;

    // Clamp t to the range [0, 1] to ensure the projection falls on the segment
    const clampedT = Math.max(0, Math.min(1, t));

    // Calculate the closest point on the line segment to the point
    const closestPoint = {
        x: lineStart.x + clampedT * (lineEnd.x - lineStart.x),
        y: lineStart.y + clampedT * (lineEnd.y - lineStart.y)
    };

    // Return the distance from the point to the closest point on the line segment
    return getDistanceFromPoint(point, closestPoint);
}