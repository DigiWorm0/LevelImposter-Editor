import {atom, useAtom} from "jotai";

export const loopAnimAtom = atom(false);

export default function useLoopAnim() {
    return useAtom(loopAnimAtom);
}