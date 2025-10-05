import {atom, useSetAtom} from "jotai";
import {optimizeLogAtom} from "./useOptimizeLog";

export const appendOptimizeLogAtom = atom(null, (get, set, newLog: string) => {
    const currentLog = get(optimizeLogAtom);
    set(optimizeLogAtom, [...currentLog, newLog]);
});

export default function useAppendOptimizeLog() {
    return useSetAtom(appendOptimizeLogAtom);
}