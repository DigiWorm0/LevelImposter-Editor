import {atom, useAtom} from "jotai";

export const timelineOffsetAtom = atom(0);

export default function useTimelineOffset() {
    return useAtom(timelineOffsetAtom);
}