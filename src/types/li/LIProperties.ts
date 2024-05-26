import GUID from "../generic/GUID";
import LICollider from "./LICollider";
import LIColor from "./LIColor";
import LIMinigameProps from "./LIMinigameProps";
import LIMinigameSprite from "./LIMinigameSprite";
import LISound from "./LISound";
import LITrigger from "./LITrigger";
import LICustomText from "./LICustomText";

export default interface LIProperties {

    // Generic
    colliders?: LICollider[];
    parent?: GUID;

    // Trigger
    triggers?: LITrigger[];
    triggerTime?: number;
    triggerClientSide?: boolean;
    highlightColor?: LIColor;
    triggerCount?: number;
    triggerLoop?: boolean;

    // Sound
    sounds?: LISound[];
    soundPriority?: number;

    // Minigame
    minigames?: LIMinigameSprite[];
    minigameProps?: LIMinigameProps;

    // Texts
    customText?: LICustomText;

    // Sprite
    spriteID?: GUID;
    color?: LIColor;
    loopGIF?: boolean;

    /**
     * @deprecated Use spriteID instead
     */
    spriteData?: string;

    // One-Way Colliders
    isImposterIgnored?: boolean;

    // Towels
    towelPickupCount?: number;

    // Spore
    gasColor?: LIColor;

    // Decontamination
    doorA?: GUID;
    doorB?: GUID;
    deconDuration?: number;

    // Scroll
    scrollingXSpeed?: number;
    scrollingYSpeed?: number;

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

    // Display
    displayWidth?: number;
    displayHeight?: number;

    // Console
    onlyFromBelow?: boolean;
    checkCollision?: boolean;
    range?: number;
    sporeRange?: number;

    // Ladder
    ladderHeight?: number;

    // Door
    doorType?: string;
    isDoorInteractable?: boolean;

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
    isRoomUIVisible?: boolean;

    // Minimap
    minimapScale?: number;
    imposterOnly?: boolean;

    // Spawn
    spawnDummies?: boolean;

    // Meeting

    /**
     * @deprecated Use meetingBackgroundID instead
     */
    meetingBackground?: string;
    meetingBackgroundID?: GUID;

    // Editor
    isLocked?: boolean;
    isVisible?: boolean;
    isExpanded?: boolean;
};

export type LIPropName = keyof LIProperties;