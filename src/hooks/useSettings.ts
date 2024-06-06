import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import LISettings, { DEFAULT_SETTINGS } from "../types/li/LISettings";

// Atoms
export const settingsStoreAtom = atomWithStorage<Partial<LISettings>>("settings", {});
export const settingsAtom = atom((get) => {
        const storageSettings = get(settingsStoreAtom);
        return { ...DEFAULT_SETTINGS, ...storageSettings } as LISettings;
    },
    (get, set, update: Partial<LISettings>) => {
        const storageSettings = get(settingsStoreAtom);
        set(settingsStoreAtom, { ...storageSettings, ...update });
    }
);

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