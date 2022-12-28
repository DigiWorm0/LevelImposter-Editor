import GUID from "../generic/GUID";
import LICollider from "./LICollider";
import LIColor from "./LIColor";
import LISound from "./LISound";
import LITrigger from "./LITrigger";

export default interface LIProperties {

    // Generic
    colliders?: LICollider[];
    parent?: GUID;

    // Trigger
    triggers?: LITrigger[];
    triggerTime?: number;
    triggerClientSide?: boolean;

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

    // Door
    doorType?: string;

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