import {atom, useAtom} from "jotai";

export const spriteAnimEditorOpenAtom = atom(false);

export default function useSpriteAnimEditorOpen() {
    return useAtom(spriteAnimEditorOpenAtom);
}