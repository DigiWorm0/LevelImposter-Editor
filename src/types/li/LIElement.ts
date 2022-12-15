import GUID from "../generic/GUID";
import LICollider from "./LICollider";
import LIColor from "./LIColor";
import LISound from "./LISound";
import LITrigger from "./LITrigger";

export default interface LIElement {
    id: GUID;
    parentID?: GUID;
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
        colliders?: LICollider[];
        parent?: GUID;

        // Trigger
        triggers?: LITrigger[];
        triggerTime?: number;

        // Sound
        sounds?: LISound[];
        soundPriority?: number;

        // Sprite
        spriteData?: string;
        color?: LIColor;

        // Vent
        leftVent?: GUID;
        middleVent?: GUID;
        rightVent?: GUID;

        // Teleporter
        teleporter?: GUID;

        // Camera
        camXOffset?: number;
        camYOffset?: number;
        camZoom?: number;

        // Console
        onlyFromBelow?: boolean;
        range?: number;

        // Ladder
        ladderHeight?: number;

        // Platform
        platformXOffset?: number;
        platformYOffset?: number;
        platformXEntranceOffset?: number;
        platformYEntranceOffset?: number;
        platformXExitOffset?: number;
        platformYExitOffset?: number;

        // Star Field
        starfieldMinSpeed?: number;
        starfieldMaxSpeed?: number;
        starfieldCount?: number;
        starfieldHeight?: number;
        starfieldLength?: number;

        // Floaing
        floatingHeight?: number;
        floatingSpeed?: number;

        // Task
        description?: string;
        taskLength?: string;

        // Room
        isRoomNameVisible?: boolean;
        isRoomAdminVisible?: boolean;

        // Minimap
        minimapScale?: number;

        // Editor
        isLocked?: boolean;
        isVisible?: boolean;
        isExpanded?: boolean;
    };
}

export type MaybeLIElement = LIElement | undefined;