import { atom, useAtom, useSetAtom } from "jotai";

export const isSavedAtom = atom(true);

export default function useIsSaved() {
    return useAtom(isSavedAtom);
}

export function useSetSaved() {
    return useSetAtom(isSavedAtom);
}