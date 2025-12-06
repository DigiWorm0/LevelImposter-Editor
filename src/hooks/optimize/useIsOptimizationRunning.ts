import {atom, useAtom} from "jotai";

export const isOptimizationRunningAtom = atom(false);

export default function useIsOptimizationRunning() {
    return useAtom(isOptimizationRunningAtom);
}