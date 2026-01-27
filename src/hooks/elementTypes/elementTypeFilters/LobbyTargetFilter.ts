import {mapTargetAtom} from "../../map/useMap";
import MapTarget from "../../../types/li/MapTarget";
import makeElementTypeFilter from "../makeElementTypeFilter";

const LOBBY_ELEMENT_WHITELIST = [
    "util-blank",
    "util-lobby",
    "util-trigger",
    "util-value",
    "util-blanktrigger",
    "util-starfield",
    "util-sound",
    "util-tele",
    "util-display",
    "util-layer",
    "util-playermover",
    "dec-",
    "room-"
];

const LOBBY_ELEMENT_BLACKLIST = [
    "util-triggerdeath",
];

const LobbyTargetFilter = makeElementTypeFilter((type, get) => {
    const mapTarget = get(mapTargetAtom);
    if (mapTarget !== MapTarget.Lobby)
        return true;

    // Disable blacklisted types
    for (const blacklistedType of LOBBY_ELEMENT_BLACKLIST) {
        if (type.startsWith(blacklistedType))
            return false;
    }

    // Enable whitelisted types
    for (const whitelistedType of LOBBY_ELEMENT_WHITELIST) {
        if (type.startsWith(whitelistedType))
            return true;
    }

    // Disable all other types
    return false;
});

export default LobbyTargetFilter;