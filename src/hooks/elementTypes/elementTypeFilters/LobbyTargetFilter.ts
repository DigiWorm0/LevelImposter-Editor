import MapTarget from "../../../types/li/MapTarget";
import makeElementTypeFilter from "../makeElementTypeFilter";
import {docPropertiesAtom} from "@editor/document/documentStore";

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
    "util-physics",
    "dec-",
    "room-"
];

const LOBBY_ELEMENT_BLACKLIST = [
    "util-triggerdeath",
];

const GAME_ELEMENT_BLACKLIST = [
    "util-lobbywardrobe",
    "util-lobbymaps",
    "util-lobbyoptions",
    "util-lobbyspawn"
];

const LobbyTargetFilter = makeElementTypeFilter((type, get) => {
    const {mapTarget} = get(docPropertiesAtom);
    const isLobbyMap = mapTarget === MapTarget.Lobby;

    if (!isLobbyMap) {
        // Disable game-specific blacklisted types
        for (const blacklistedType of GAME_ELEMENT_BLACKLIST) {
            if (type.startsWith(blacklistedType))
                return false;
        }

        // Enable all other types on game maps
        return true;
    }

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