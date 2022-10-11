import LIElement from "../types/li/LIElement";

const INVISIBLE_TYPES = [
    "util-spawn1",
    "util-spawn2",
    "util-tele",
    "util-triggerarea",
    "util-triggerrepeat",
    "util-triggertimer",
    "util-sound1",
    "util-sound2",
]

const INVISIBLE_TYPES_NO_SPRITE = [
    "util-blank",
    "util-blankfloat"
]

const INVISIBLE_TYPES_MINIMAP = [
    "util-minimap",
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
    InvisibleRoom,
    InvisibleFreeplay
}

export default function checkMapVisibility(elem: LIElement): MapVisibility {
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
            return MapVisibility.InvisibleRoom;
    }
    if (elem.type === "util-dummy") {
        return MapVisibility.InvisibleFreeplay;
    }

    return MapVisibility.Visible;
}
