import GUID from "../generic/GUID";
import Point from "../generic/Point";

export default interface LICollider {
    id: GUID;
    name?: string;
    blocksLight: boolean;
    isSolid: boolean;
    points: Point[];
}

export type MaybeLICollider = LICollider | undefined;