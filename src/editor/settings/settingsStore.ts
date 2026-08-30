import {atomWithStorage} from "jotai/utils";
import LISettings, {DEFAULT_SETTINGS} from "@/types/li/LISettings";
import {atom} from "jotai";

export const rawSettingsAtom = atomWithStorage<Partial<LISettings>>("settings", {});

// Calculated
export const settingsAtom = atom((get) => {
    const storageSettings = get(rawSettingsAtom);
    return {
        ...DEFAULT_SETTINGS,
        ...storageSettings
    } as LISettings;
}, (get, set, update: Partial<LISettings>) => {
    const storageSettings = get(rawSettingsAtom);
    set(rawSettingsAtom, {
        ...storageSettings,
        ...update
    });
});