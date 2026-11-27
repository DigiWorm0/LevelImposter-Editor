import {atom} from "jotai";
import {selectedElementAtom} from "@editor/selection/stores/elementSelectionStore";
import {selectedSpriteAnimIDAtom, selectedSpriteAnimTypeAtom} from "@editor/selection/stores/spriteAnimSelectionStore";
import {availableSpriteAnimTypesAtom} from "./availableSpriteAnimTypes";
import executeCommand from "@editor/history/executeCommand";
import {setElementProp} from "@editor/document/elements/setElementProp";
import type LISpriteAnimation from "@/map-format/LISpriteAnimation";

export const isSpriteAnimPlayingAtom = atom(true);
export const isSpriteAnimEditorOpenAtom = atom(false);

export const activeSpriteAnimTypeAtom = atom((get) => {
    const type = get(selectedSpriteAnimTypeAtom);
    return type && get(availableSpriteAnimTypesAtom).includes(type) ? type : "default";
});

export const selectedSpriteAnimAtom = atom((get) => {
    const animations = get(selectedElementAtom)?.properties.animations ?? [];
    const id = get(selectedSpriteAnimIDAtom);
    const type = get(activeSpriteAnimTypeAtom);
    return animations.find(anim => anim.id === id && anim.frames.length > 0) ??
        animations.find(anim => (anim.type ?? "default") === type && anim.frames.length > 0);
}, (get, _set, animation: LISpriteAnimation | undefined) => {
    const element = get(selectedElementAtom);
    if (!element)
        return;

    const animations = element.properties.animations ?? [];
    const selectedAnim = get(selectedSpriteAnimAtom);
    const index = selectedAnim
        ? animations.findIndex(anim => anim.id === selectedAnim.id)
        : animations.findIndex(anim => (anim.type ?? "default") === get(activeSpriteAnimTypeAtom));
    if (!animation && index < 0)
        return;

    const nextAnimations = [...animations];
    if (index < 0) {
        if (animation)
            nextAnimations.push(animation);
    } else if (animation) {
        nextAnimations[index] = animation;
    } else {
        nextAnimations.splice(index, 1);
    }
    executeCommand(setElementProp(element.id, "animations", nextAnimations));
});
