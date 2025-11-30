import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../../types/common/GUID";
import {atom, useAtom} from "jotai";
import {animationsAtom} from "../../map/useMap";
import LISpriteAnimation from "../../../types/li/LISpriteAnimation";

export const spriteAnimationAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const spriteAnimations = get(animationsAtom);
        return spriteAnimations?.find((anim) => anim.id === id) || null;
    }, (get, set, newAnimation: LISpriteAnimation) => {
        const spriteAnimations = get(animationsAtom);
        const updatedAnimations = spriteAnimations?.map((anim) =>
            anim.id === id ? newAnimation : anim
        );
        set(animationsAtom, updatedAnimations);
    });
});

export default function useSpriteAnimation(id: MaybeGUID) {
    return useAtom(spriteAnimationAtomFamily(id));
}