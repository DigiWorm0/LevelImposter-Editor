import {atom, useAtom} from "jotai";
import {selectedElementAtom} from "../useSelectedElem";
import {spriteAnimationAtomFamily} from "./useSpriteAnimation";
import LISpriteAnimation from "../../../types/li/LISpriteAnimation";

export const selectedElemSpriteAnimation = atom((get) => {

    // Get the selected element
    const selectedElem = get(selectedElementAtom);
    if (!selectedElem)
        return null;

    // Get the sprite animation property
    const animationID = selectedElem.properties?.animationID;
    if (!animationID)
        return null;

    // Get the animations from the map
    const animation = get(spriteAnimationAtomFamily(animationID));
    return animation || null;
}, (get, set, newAnimation: LISpriteAnimation) => {
    // Get the selected element
    const selectedElem = get(selectedElementAtom);
    if (!selectedElem)
        return;

    // Get the sprite animation property
    const animationID = selectedElem.properties?.animationID;
    if (!animationID)
        return;

    // Update the animation in the map
    set(spriteAnimationAtomFamily(animationID), newAnimation);
});

export default function useSelectedElemSpriteAnimation() {
    return useAtom(selectedElemSpriteAnimation);
}