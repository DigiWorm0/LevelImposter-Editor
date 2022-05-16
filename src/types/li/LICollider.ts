import GUID from "../generic/GUID";
import Point from "../generic/Point";

export default interface LICollider {
    id: GUID;
    blocksLight: boolean;
    isSolid: boolean;
    points: Point[];
}