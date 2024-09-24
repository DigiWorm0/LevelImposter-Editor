import { useSetAtom } from "jotai";
import { atom } from "jotai/index";
import LIElement from "../../types/li/LIElement";
import getDefaultZ from "../../utils/map/getDefaultZ";
import { addElementAtom } from "./useAddElement";
import { cameraXAtom, cameraYAtom } from "../canvas/useCameraPos";

export const addElementAtCameraAtom = atom(null, (get, set, elem: LIElement) => {
    elem.x = get(cameraXAtom);
    elem.y = get(cameraYAtom);
    elem.z = getDefaultZ(elem);
    set(addElementAtom, elem);
});

export default function useAddElementAtCamera() {
    return useSetAtom(addElementAtCameraAtom);
}