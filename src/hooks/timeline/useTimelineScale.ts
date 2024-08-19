import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";

export const timelineScaleAtom = atom(100);

export default function useTimelineScale() {
    return useAtom(timelineScaleAtom);
}

export function useTimelineScaleValue() {
    return useAtomValue(timelineScaleAtom);
}

export function useSetTimelineScale() {
    return useSetAtom(timelineScaleAtom);
}