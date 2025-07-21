import {useAtomValue} from "jotai";
import {atomFamily, unwrap} from "jotai/utils";
import {spriteAtomFamily} from "./useSprite";

export const spriteOfTypeAtomFamily = atomFamily((type?: string) => {
    return spriteAtomFamily(`/sprites/${type}.png`);
});

export default function useSpriteOfType(type?: string) {
    return useAtomValue(unwrap(spriteOfTypeAtomFamily(type)));
}