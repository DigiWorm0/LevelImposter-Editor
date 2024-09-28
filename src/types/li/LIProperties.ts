import GUID from "../generic/GUID";
import LICollider from "./LICollider";
import LIColor from "./LIColor";
import LIMinigameProps from "./LIMinigameProps";
import LIMinigameSprite from "./LIMinigameSprite";
import LISound from "./LISound";
import LITrigger from "./LITrigger";
import LICustomText from "./LICustomText";
import LIAnimTarget from "./LIAnimTarget";
import {PRESET_RESOURCE_IDS} from "../../db/AUElementDB";

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
    createDeadBody?: boolean;
    triggerFadeTime?: number;

    // Animations
    animTargets?: LIAnimTarget[];

    // Sound Preset Type (Dirt, Metal, etc.)
    soundPresetType?: keyof typeof PRESET_RESOURCE_IDS;

    // Sound List
    sounds?: LISound[];

    // Sound Priority Level
    // TODO: Is this increasing or decreasing?
    soundPriority?: number;

    // Shake
    shakeAmount?: number;
    shakePeriod?: number;

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
    sporeDuration?: number;
    sporeCooldown?: number;

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
    ladderCooldown?: number;
    ladderOffset?: number;

    // Door
    doorType?: string;
    isDoorInteractable?: boolean;
    isDoorClosed?: boolean;

    // Eject
    ejectPreTextDuration?: number;
    ejectTextDuration?: number;
    ejectPostTextDuration?: number;

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
export type LIPropNameType<T> = {
    [K in keyof LIProperties]: LIProperties[K] extends T ? K : never;
}[keyof LIProperties];
