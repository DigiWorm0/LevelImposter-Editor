import GUID from "../generic/GUID";
import LICollider from "./LICollider";

export default interface LIProperties {
    leftVent?: GUID;
    middleVent?: GUID;
    rightVent?: GUID;

    onlyFromBelow?: boolean;
    range?: number;

    spriteData?: string;
    colliders?: LICollider[];
}