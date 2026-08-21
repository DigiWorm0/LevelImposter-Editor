import {atom, useAtom, useSetAtom} from "jotai";
import {playheadAtom} from "./usePlayhead";
import {animDurationAtom} from "./useAnimDuration";

export const _isAnimPlayingAtom = atom(false);
export const isAnimPlayingAtom = atom(get => get(_isAnimPlayingAtom), (get, set, isPlaying: boolean) => {

    // Reset Playback
    if (isPlaying) {
        const playhead = get(playheadAtom);
        const duration = get(animDurationAtom);
        if (playhead >= duration)
            set(playheadAtom, 0);
    }

    set(_isAnimPlayingAtom, isPlaying);
});

export default function useIsAnimPlaying() {
    return useAtom(isAnimPlayingAtom);
}

export function useSetIsAnimPlaying() {
    return useSetAtom(isAnimPlayingAtom);
}