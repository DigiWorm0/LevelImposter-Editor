import GUID from "@shared/types/GUID";
import Vector2 from "../../shared/types/Vector2";

export default interface LICollider {
    id: GUID;
    name?: string;
    blocksLight: boolean;
    isSolid: boolean;
    points: Vector2[];
}