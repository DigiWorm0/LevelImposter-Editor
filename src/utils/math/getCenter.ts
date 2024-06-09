import Point from "../../types/generic/Point";

export default function getCenter(p1: Point, p2: Point) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
    };
}