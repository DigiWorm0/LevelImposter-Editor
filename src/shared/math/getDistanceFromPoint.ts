import Vector2 from "../types/Vector2";

/**
 * Calculates the distance between 2 points.
 * @param p1 - The first point.
 * @param p2 - The second point.
 * @return The distance between the two points.
 */
export default function getDistanceFromPoint(
    p1: Vector2,
    p2: Vector2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}
