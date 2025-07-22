import GUID from "../common/GUID";
import Vector2 from "../transform/Vector2";

export default interface LICollider {
    id: GUID;
    name?: string;
    blocksLight: boolean;
    isSolid: boolean;
    points: Vector2[];
}