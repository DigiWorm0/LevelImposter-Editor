import LIElement from "../../types/li/LIElement";

const INVISIBLE_TYPES = [
    "util-spawn1",
    "util-spawn2",
    "util-tele",
    "util-triggerrepeat",
    "util-triggertimer",
    "util-triggerstart",
    "util-triggersound",
    "util-triggerrand",
    "util-triggeranim",
    "util-sound1",
    "util-sound2",
    "util-meeting",
    "util-sabotages",
    "util-onewaycollider",
    "util-ghostcollider",
    "util-decontamination",
    "util-eject",
    "util-valuebool",
    "util-valueboolpreset",
    "util-triggergate",
    "util-valuecomparator",
    "util-layer"
];

const INVISIBLE_TYPES_NO_SPRITE = [
    "util-blank",
    "util-blankfloat",
    "util-blankscroll",
    "util-starfield",
    "util-triggerconsole",
    "util-blanktrigger",
    "util-physics",
    "util-playermover",
    "util-triggerarea",
    "util-triggerdeath",
    "util-triggershake",
];

const INVISIBLE_TYPES_MINIMAP = [
    "util-minimap",
    "util-minimapsprite",
    "sab-btnreactor",
    "sab-btnoxygen",
    "sab-btnlights",
    "sab-btncomms",
    "sab-btndoors",
];

export enum ElemVisibility {
    Visible,
    Invisible,
    InvisibleNoSprite,
    InvisibleMinimap,
    InvisibleFreeplay
}

export default function getElemVisibility(elem?: LIElement): ElemVisibility {
    if (!elem) {
        return ElemVisibility.Invisible;
    }

    if (INVISIBLE_TYPES.includes(elem.type)) {
        return ElemVisibility.Invisible;
    }

    if (INVISIBLE_TYPES_NO_SPRITE.includes(elem.type) && !elem.properties.spriteID) {
        return ElemVisibility.InvisibleNoSprite;
    }

    if (INVISIBLE_TYPES_MINIMAP.includes(elem.type)) {
        return ElemVisibility.InvisibleMinimap;
    }

    if (elem.type === "util-room") {
        if (elem.properties.isRoomNameVisible === false)
            return ElemVisibility.Invisible;
        else
            return ElemVisibility.InvisibleMinimap;
    }
    if (elem.type === "util-dummy") {
        return ElemVisibility.InvisibleFreeplay;
    }

    return ElemVisibility.Visible;
}
