import {MapElement} from "@editor/document/types/MapDocument";

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
    "util-layer",
    "util-lobbyspawn",
    "util-lobbyoptions"
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
    // The element is visible in the editor and in the game
    Visible,

    // The element is invisible in the editor and in the game
    Invisible,

    // The element is invisible, unless it gets a sprite assigned to it
    InvisibleNoSprite,

    // The element is only visible in the minimap
    InvisibleMinimap,

    // The element is only visible in freeplay mode
    InvisibleFreeplay
}

export default function getElementVisibility(elem?: MapElement): ElemVisibility {
    if (!elem)
        return ElemVisibility.Invisible;

    const elemType = elem?.type ?? "";

    if (INVISIBLE_TYPES.includes(elemType))
        return ElemVisibility.Invisible;

    if (INVISIBLE_TYPES_NO_SPRITE.includes(elemType) && !elem.properties.spriteID)
        return ElemVisibility.InvisibleNoSprite;

    if (INVISIBLE_TYPES_MINIMAP.includes(elemType))
        return ElemVisibility.InvisibleMinimap;

    if (elem.type === "util-room") {
        if (elem.properties.isRoomNameVisible === false)
            return ElemVisibility.Invisible;
        else
            return ElemVisibility.InvisibleMinimap;
    }

    if (elem.type === "util-dummy")
        return ElemVisibility.InvisibleFreeplay;

    return ElemVisibility.Visible;
}