import {atom, useAtom} from "jotai";
import {availableSpriteAnimTypesAtom} from "./useAvailableSpriteAnimTypes";

export const _selectedSpriteAnimTypeAtom = atom<string>("default");

export const selectedSpriteAnimTypeAtom = atom((get) => {
    const availableTypes = get(availableSpriteAnimTypesAtom);
    const selectedType = get(_selectedSpriteAnimTypeAtom);

    // If selected type is available, return it
    if (selectedType && availableTypes.includes(selectedType))
        return selectedType;

    // Fallback to "default" if available
    return "default";
}, (get, set, newType: string) => {
    const availableTypes = get(availableSpriteAnimTypesAtom);

    // Only set if new type is available
    if (availableTypes.includes(newType))
        set(_selectedSpriteAnimTypeAtom, newType);

    // Otherwise, do nothing
});

export default function useSelectedSpriteAnimType() {
    return useAtom(selectedSpriteAnimTypeAtom);
}