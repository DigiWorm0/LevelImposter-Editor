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
        // Generic
        spriteData?: string;
        colliders?: LICollider[];
        parent?: GUID;

        // Vent
        leftVent?: GUID;
        middleVent?: GUID;
        rightVent?: GUID;

        // Camera
        camXOffset?: number;
        camYOffset?: number;
        camZoom?: number;

        // Console
        onlyFromBelow?: boolean;
        range?: number;

        // Ladder
        ladderHeight?: number;

        // Task
        description?: string;
        taskLength?: string;

        // Editor
        isLocked?: boolean;
    };
}

export type MaybeLIElement = LIElement | undefined;