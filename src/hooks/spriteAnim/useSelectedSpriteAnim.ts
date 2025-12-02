import {atom, useAtom} from "jotai";
import {selectedSpriteAnimIDAtom} from "./useSelectedSpriteAnimID";
import {selectedSpriteAnimTypeAtom} from "./useSelectedSpriteAnimType";
import {selectedElementPropAtom} from "../elements/useSelectedElemProperty";
import LISpriteAnimation from "../../types/li/LISpriteAnimation";

export const selectedSpriteAnimAtom = atom((get) => {
    // Get current animations
    const animations = (get(selectedElementPropAtom("animations")) || []) as LISpriteAnimation[];

    // Find selected spriteAnim by ID
    const selectedID = get(selectedSpriteAnimIDAtom);
    const animationByID = animations.find(anim => anim.id === selectedID);
    if (animationByID && animationByID.frames.length > 0)
        return animationByID;

    // Fallback: Find selected spriteAnim by type
    const selectedType = get(selectedSpriteAnimTypeAtom);
    const animationByType = animations.find(anim => anim.type === selectedType);
    if (animationByType && animationByType.frames.length > 0)
        return animationByType;

    return undefined;
}, (get, set, newAnim: LISpriteAnimation) => {
    // Get current animations
    const animations = (get(selectedElementPropAtom("animations")) || []) as LISpriteAnimation[];

    // Find selected spriteAnim by ID
    let index = animations.findIndex(anim => anim.id === newAnim?.id) ?? -1;

    // Find selected spriteAnim by type if ID not found
    if (index < 0)
        index = animations.findIndex(anim => anim.type === newAnim?.type) ?? -1;

    // If not found, create new spriteAnim
    if (index < 0)
        animations.push(newAnim);

    // Otherwise, update existing spriteAnim
    else
        animations[index] = newAnim;

    // Save updated animations
    set(selectedElementPropAtom("animations"), [...animations]);
});

export default function useSelectedSpriteAnim() {
    return useAtom(selectedSpriteAnimAtom);
}