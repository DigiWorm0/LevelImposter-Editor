import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { insertPointAtMouseAtom, isSelectedSoundAtom, selectedSoundAtom, selectedSoundIDAtom } from "./Jotai";

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

export function useInsertPointAtMouse() {
    return useSetAtom(insertPointAtMouseAtom);
}