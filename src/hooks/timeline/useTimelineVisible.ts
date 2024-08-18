import {atom, useAtom} from "jotai";

export const timelineVisibleAtom = atom(false);

export default function useTimelineVisible() {
    return useAtom(timelineVisibleAtom);
}