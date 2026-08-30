// TODO: Remove this file

export const UNITY_SCALE = 100;
export const DEFAULT_CONSOLE_RANGE = 1;
export const DEFAULT_SPORE_RANGE = 0.25;
export const DEFAULT_SPORE_GAS_RANGE = 3.7;
export const DEFAULT_SPORE_DURATION = 5;
export const DEFAULT_SPORE_COOLDOWN = 17;
export const VENT_CONSOLE_RANGE = 0.75;
export const DEFAULT_SPAWN_RANGE = 1.55;
export const DEFAULT_CAM_SIZE = 6;
export const DEFAULT_CAM_ASPECT = 330 / 230;
export const SECONDARY_CAM_ASPECT = 21 / 9;
export const DEFAULT_LADDER_HEIGHTS: Record<string, number> = {
    "util-ladder1": 3,
    "util-ladder2": 1.5,
};
export const DEFAULT_LADDER_COOLDOWN = 5;
export const DEFAULT_LADDER_OFFSET = -0.4;

export const DEFAULT_DISPLAY_HEIGHT = 230;
export const DEFAULT_DISPLAY_WIDTH = 330;

export const DEFAULT_PLATFORM_OFFSET = 3;
export const DEFAULT_PLATFORM_ENTER = -1.5;
export const DEFAULT_PLATFORM_EXIT = 1.5;
export const PLATFORM_RADIUS = 0.4;

export const DEFAULT_STARFIELD_MAXSPEED = 4;
export const DEFAULT_STARFIELD_MINSPEED = 2;
export const DEFAULT_STARFIELD_COUNT = 20;
export const DEFAULT_STARFIELD_HEIGHT = 10;
export const DEFAULT_STARFIELD_LENGTH = 10;

export const DEFAULT_FLOATING_HEIGHT = 0.2;
export const DEFAULT_FLOATING_SPEED = 2;

export const DEFAULT_SCROLL_X_SPEED = 1;
export const DEFAULT_SCROLL_Y_SPEED = 0;

export const LADDER_RADIUS = 0.5;
export const MINIMAP_BASE_SCALE = 1 / 4.975;
export const MINIMAP_WIDTH = 10 / MINIMAP_BASE_SCALE;
export const MINIMAP_HEIGHT = 6 / MINIMAP_BASE_SCALE;

export const SPAWN_PLAYER_COUNT = 15;

export const DEFAULT_VOLUME = 1;

export const THUMBNAIL_WIDTH = 412;
export const THUMBNAIL_HEIGHT = 144;

export const MAP_FORMAT_VER = 3;
export const MAX_DOOR_COUNT = 64;

export const PLAYER_POS = -5;

export const LANGUAGES = [
    "auto",
    "de",
    "en",
    "es",
    "fr",
    "zh-CN",
    "ru",
];

export const SINGLE_TYPES = [
    "util-minimap",
    "util-meeting",
    "util-spawn1",
    "util-spawn2",
    "util-platform",
    "sab-electric",
    "sab-oxygen1",
    "sab-oxygen2",
    "sab-comms",
    "sab-reactorleft",
    "sab-reactorright",
    "util-sabotages",
    "util-cams4",
    "util-eject"
];

export const SUPPORTED_IMAGE_TYPES = [
    "image/png",
    "image/gif",
    "image/jpeg"
];

export const SUPPORTED_MAP_FILE_TYPES = [
    ".lim",
    ".lim2",
    ".json"
];