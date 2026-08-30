import getElemVisibility, {ElemVisibility} from "./getMapVisibility";
import {MapElement} from "@editor/document/types/MapDocument";

export default function getDefaultZ(elem: MapElement) {
    if (elem.type === "util-layer")
        return 0;
    if (elem.type?.startsWith("room-"))
        return 20;
    if (getElemVisibility(elem) === ElemVisibility.Invisible || elem.type === "util-room")
        return -20;
    return 0;
}