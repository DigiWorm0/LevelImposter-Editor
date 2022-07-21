import GUID from "../generic/GUID";
import LICollider from "./LICollider";

export default interface LIElement {
    id: GUID;
    name: string;
    type: string;
    x: number;
    y: number;
    z: number;
    xScale: number;
    yScale: number;
    rotation: number;
    properties: {
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
    };
}

export type MaybeLIElement = LIElement | undefined;