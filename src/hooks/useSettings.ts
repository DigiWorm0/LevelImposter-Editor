import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import LISettings from "../types/li/LISettings";

// Atoms
export const settingsAtom = atomWithStorage<LISettings>("settings", {});

// Debug
settingsAtom.debugLabel = "settings";

// Hooks
export default function useSettings() {
    return useAtom(settingsAtom);
}
export function useSetSettings() {
    return useSetAtom(settingsAtom);
}
export function useSettingsValue() {
    return useAtomValue(settingsAtom);
}