import {focusAtom} from "jotai-optics";
import {useAtomValue} from "jotai";
import {viewportPositionAtom} from "./useViewportPosition";

export const viewportScaleAtom = focusAtom(viewportPositionAtom, (optic) => optic.prop("scale"));

export default function useViewportScale() {
    return useAtomValue(viewportScaleAtom);
}