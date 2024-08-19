import {atom, useAtom} from "jotai";

export const playAnimAtom = atom(false);

export default function usePlayAnim() {
    return useAtom(playAnimAtom);
}