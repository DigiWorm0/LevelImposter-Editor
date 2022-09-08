import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { MaybeLISound } from "../../types/li/LISound";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedSoundIDAtom = atom<MaybeGUID>(undefined);
export const selectedSoundAtom = atom(
    (get) => {
        const selectedElem = get(selectedElementAtom);
        const selectedSoundID = get(selectedSoundIDAtom);
        const selectedSound = selectedElem?.properties.sounds?.find(
            (sound) => sound.id === selectedSoundID
        );
        return selectedSound;
    },
    (get, set, sound: MaybeLISound) => {
        const selectedElem = get(selectedElementAtom);
        const sounds = selectedElem?.properties.sounds;
        const index = sounds?.findIndex((c) => c.id === sound?.id);
        if (index != undefined && index >= 0 && sounds != undefined && sound != undefined) {
            sounds[index] = sound;
            set(selectedElementAtom, selectedElem);
        }
    }
);
export const isSelectedSoundAtom = atom(
    (get) => {
        return get(selectedSoundIDAtom) != undefined;
    }
);

// Debug
selectedSoundIDAtom.debugLabel = "selectedSoundIDAtom";
selectedSoundAtom.debugLabel = "selectedSoundAtom";
isSelectedSoundAtom.debugLabel = "isSelectedSoundAtom";

// Hooks
export function useSelectedSoundID() {
    return useAtom(selectedSoundIDAtom);
}
export function useSetSelectedSoundID() {
    return useSetAtom(selectedSoundIDAtom);
}
export function useSelectedSoundIDValue() {
    return useAtomValue(selectedSoundIDAtom);
}
export default function useSelectedSound() {
    return useAtom(selectedSoundAtom);
}
export function useSetSelectedSound() {
    return useSetAtom(selectedSoundAtom);
}
export function useSelectedSoundValue() {
    return useAtomValue(selectedSoundAtom);
}
export function useIsSelectedSound() {
    return useAtomValue(isSelectedSoundAtom);
}