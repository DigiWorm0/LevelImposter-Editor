import {useSetAtom} from "jotai";
import {atom} from "jotai/index";
import LIElement from "../../types/li/LIElement";
import getDefaultZ from "../../utils/map/getDefaultZ";
import {addElementAtom} from "./useAddElement";
import {viewportAtom} from "../canvas/useViewport";
import {UNITY_SCALE} from "../../types/amongus/Constants";

export const addElementAtCameraAtom = atom(null, (get, set, elem: LIElement) => {
    const viewport = get(viewportAtom);

    // TODO: Scale viewport
    elem.x = (viewport?.center.x ?? 0) / UNITY_SCALE;
    elem.y = (viewport?.center.y ?? 0) / -UNITY_SCALE;
    elem.z = getDefaultZ(elem);
    set(addElementAtom, elem);
});

export default function useAddElementAtCamera() {
    return useSetAtom(addElementAtCameraAtom);
}