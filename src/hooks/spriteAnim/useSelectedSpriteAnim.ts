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
}, (get, set, newAnim?: LISpriteAnimation) => {
    // Get current animations
    let animations = (get(selectedElementPropAtom("animations")) || []) as LISpriteAnimation[];

    // Get selected animation
    const selectedAnim = get(selectedSpriteAnimAtom);

    // Find selected spriteAnim by ID
    const index = animations.findIndex(anim => anim.id === selectedAnim?.id);

    // Remove existing spriteAnim with same ID as newAnim
    if (newAnim === undefined)
        animations = animations.filter(anim => anim.id !== selectedAnim?.id);

    // If not found, create new spriteAnim
    else if (index < 0)
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