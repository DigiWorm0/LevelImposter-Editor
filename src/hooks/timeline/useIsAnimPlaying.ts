import {atom, useAtom, useSetAtom} from "jotai";

export const isAnimPlayingAtom = atom(false);

export default function useIsAnimPlaying() {
    return useAtom(isAnimPlayingAtom);
}

export function useSetIsAnimPlaying() {
    return useSetAtom(isAnimPlayingAtom);
}