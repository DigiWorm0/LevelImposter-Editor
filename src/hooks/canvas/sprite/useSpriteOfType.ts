import { useAtomValue } from "jotai";
import { imageAtomFamily } from "./useImage";
import { atomFamily, unwrap } from "jotai/utils";

export const spriteOfTypeAtomFamily = atomFamily((type?: string) => {
    return imageAtomFamily(`/sprites/${type}.png`);
});

export default function useSpriteOfType(type?: string) {
    return useAtomValue(unwrap(spriteOfTypeAtomFamily(type)));
}