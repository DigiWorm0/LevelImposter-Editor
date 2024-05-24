import { atom } from "jotai/index";
import LIElement from "../../../types/li/LIElement";
import getDefaultZ from "../../../utils/getDefaultZ";
import { addElementAtom } from "./useAddElement";
import { useSetAtom } from "jotai";
import { mouseXAtom, mouseYAtom } from "../../input/useMouse";

export const addElementAtMouseAtom = atom(null, (get, set, elem: LIElement) => {
    const mouseX = get(mouseXAtom);
    const mouseY = get(mouseYAtom);
    const mouseZ = getDefaultZ(elem);
    elem.x = mouseX;
    elem.y = mouseY;
    elem.z = mouseZ;
    set(addElementAtom, elem);
});

// Debug
addElementAtMouseAtom.debugLabel = "addElementAtMouseAtom";

export default function useAddElementAtMouse() {
    return useSetAtom(addElementAtMouseAtom);
}