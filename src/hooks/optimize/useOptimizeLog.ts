import {atom, useAtom} from "jotai";

export const optimizeLogAtom = atom<string[]>([]);

export default function useOptimizeLog() {
    return useAtom(optimizeLogAtom);
}