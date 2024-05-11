import LIElement from "../types/li/LIElement";
import getElemVisibility, { ElemVisibility } from "./getMapVisibility";

export default function getDefaultZ(elem: LIElement) {
    if (elem.type.startsWith("room-"))
        return 20;
    if (getElemVisibility(elem) === ElemVisibility.Invisible || elem.type === "util-room")
        return -20;
    return 0;
}