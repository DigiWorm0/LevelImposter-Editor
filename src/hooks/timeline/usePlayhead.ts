import {atom, useAtom, useSetAtom} from "jotai";

export const playheadAtom = atom(0);

export default function usePlayhead() {
    return useAtom(playheadAtom);
}

export function useSetPlayhead() {
    return useSetAtom(playheadAtom);
}