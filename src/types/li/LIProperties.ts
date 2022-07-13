import GUID from "../generic/GUID";
import LICollider from "./LICollider";

export default interface LIProperties {
    parent?: GUID;

    leftVent?: GUID;
    middleVent?: GUID;
    rightVent?: GUID;

    camXOffset?: number;
    camYOffset?: number;
    camZoom?: number;

    onlyFromBelow?: boolean;
    range?: number;

    isLocked?: boolean;

    spriteData?: string;
    colliders?: LICollider[];
}