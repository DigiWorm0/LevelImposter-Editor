import {atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai";

export const enabledOptimizeOptionIDsAtom = atomWithStorage<string[]>("enabledOptimizeOptionIDs", []);

export default function useEnabledOptimizeOptionIDs() {
    return useAtom(enabledOptimizeOptionIDsAtom);
}