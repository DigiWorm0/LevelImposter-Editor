import {atom, useAtom, useSetAtom} from "jotai";

export const timelineOffsetAtom = atom(0);

export default function useTimelineOffset() {
    return useAtom(timelineOffsetAtom);
}

export function useSetTimelineOffset() {
    return useSetAtom(timelineOffsetAtom);
}