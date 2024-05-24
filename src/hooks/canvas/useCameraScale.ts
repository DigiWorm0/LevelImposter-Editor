import { atom, useAtomValue, useSetAtom } from "jotai";

export const cameraScaleAtom = atom(0);

export function useSetCameraScale() {
    return useSetAtom(cameraScaleAtom);
}

export function useCameraScaleValue() {
    return useAtomValue(cameraScaleAtom);
}