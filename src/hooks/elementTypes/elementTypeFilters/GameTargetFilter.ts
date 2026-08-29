import {mapTargetAtom} from "@editor/documentStore";
import MapTarget from "../../../types/li/MapTarget";
import makeElementTypeFilter from "../makeElementTypeFilter";

const GameTargetFilter = makeElementTypeFilter((type, get) => {
    const mapTarget = get(mapTargetAtom);
    if (mapTarget !== MapTarget.Game)
        return true;

    // Disable all lobby element types
    if (type.startsWith("util-lobby"))
        return false;

    return true;
});

export default GameTargetFilter;