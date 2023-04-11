import GUID from "../generic/GUID";
import LICollider from "./LICollider";
import LIColor from "./LIColor";
import LIMinigameProps from "./LIMinigameProps";
import LIMinigameSprite from "./LIMinigameSprite";
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
    highlightColor?: LIColor;

    // Sound
    sounds?: LISound[];
    soundPriority?: number;

    // Minigame
    minigames?: LIMinigameSprite[];
    minigameProps?: LIMinigameProps;

    // Sprite
    spriteData?: string;
    color?: LIColor;

    // Vent
    leftVent?: GUID;
    middleVent?: GUID;
    rightVent?: GUID;

    // Teleporter
    teleporter?: GUID;
    preserveOffset?: boolean;
    isGhostEnabled?: boolean;

    // Camera
    camXOffset?: number;
    camYOffset?: number;
    camZoom?: number;

    // Console
    onlyFromBelow?: boolean;
    checkCollision?: boolean;
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
    sabDuration?: number;

    // Room
    isRoomNameVisible?: boolean;
    isRoomAdminVisible?: boolean;

    // Minimap
    minimapScale?: number;
    imposterOnly?: boolean;

    // Editor
    isLocked?: boolean;
    isVisible?: boolean;
    isExpanded?: boolean;
};