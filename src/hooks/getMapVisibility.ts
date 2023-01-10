import LIElement from "../types/li/LIElement";

const INVISIBLE_TYPES = [
    "util-spawn1",
    "util-spawn2",
    "util-tele",
    "util-triggerarea",
    "util-triggerrepeat",
    "util-triggertimer",
    "util-triggerstart",
    "util-sound1",
    "util-sound2",
]

const INVISIBLE_TYPES_NO_SPRITE = [
    "util-blank",
    "util-blankfloat",
    "util-starfield"
]

const INVISIBLE_TYPES_MINIMAP = [
    "util-minimap",
    "util-minimapsprite",
    "sab-btnreactor",
    "sab-btnoxygen",
    "sab-btnlights",
    "sab-btncomms",
]

export enum MapVisibility {
    Visible,
    Invisible,
    InvisibleNoSprite,
    InvisibleMinimap,
    InvisibleFreeplay
}

export default function getMapVisibility(elem: LIElement): MapVisibility {
    if (INVISIBLE_TYPES.includes(elem.type)) {
        return MapVisibility.Invisible;
    }

    if (INVISIBLE_TYPES_NO_SPRITE.includes(elem.type) && !elem.properties.spriteData) {
        return MapVisibility.InvisibleNoSprite;
    }

    if (INVISIBLE_TYPES_MINIMAP.includes(elem.type)) {
        return MapVisibility.InvisibleMinimap;
    }

    if (elem.type === "util-room") {
        if (elem.properties.isRoomNameVisible === false)
            return MapVisibility.Invisible;
        else
            return MapVisibility.InvisibleMinimap;
    }
    if (elem.type === "util-dummy") {
        return MapVisibility.InvisibleFreeplay;
    }

    return MapVisibility.Visible;
}
