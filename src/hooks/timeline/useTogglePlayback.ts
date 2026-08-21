import {atom, useSetAtom} from "jotai";
import {isAnimPlayingAtom} from "./useIsAnimPlaying";

export const togglePlaybackAtom = atom(null, (get, set) => {
    const isPlaying = get(isAnimPlayingAtom);
    set(isAnimPlayingAtom, !isPlaying);
});

export default function useTogglePlayback() {
    return useSetAtom(togglePlaybackAtom);
}