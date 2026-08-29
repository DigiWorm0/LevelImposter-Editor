import {atom} from "jotai";

export const animatorsPlayheadAtom = atom(0);
export const isAnimatorsPlayingAtom = atom(false);

export const timelineScaleAtom = atom(100);
export const timelineOffsetAtom = atom(0);
export const isTimelineVisibleAtom = atom(false);