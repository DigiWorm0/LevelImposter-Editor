import Point from "./Point";

export default interface LICollider {
    id: string;
    blocksLight: boolean;
    isSolid: boolean;
    points: Point[];
}