import {atom, useAtomValue} from "jotai";
import {Viewport} from "pixi-viewport";

export const viewportAtom = atom<Viewport | undefined>(undefined);

export default function useViewport() {
    return useAtomValue(viewportAtom);
}