import {atom, useAtom, useSetAtom} from "jotai";

export const playAnimAtom = atom(false);

export default function usePlayAnim() {
    return useAtom(playAnimAtom);
}

export function useSetPlayAnim() {
    return useSetAtom(playAnimAtom);
}