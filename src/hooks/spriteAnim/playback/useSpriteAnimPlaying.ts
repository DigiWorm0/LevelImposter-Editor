import {atom, useAtom} from "jotai";

export const isSpriteAnimPlayingAtom = atom(true);

export default function useSpriteAnimPlaying() {
    return useAtom(isSpriteAnimPlayingAtom);
}