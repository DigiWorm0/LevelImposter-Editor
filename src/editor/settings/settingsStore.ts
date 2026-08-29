import {atomWithStorage} from "jotai/utils";
import LISettings, {DEFAULT_SETTINGS} from "@/types/li/LISettings";
import {atom} from "jotai";

export const settingsStoreAtom = atomWithStorage<Partial<LISettings>>("settings", {});

// Calculated
export const settingsAtom = atom(
    (get) => {
        const storageSettings = get(settingsStoreAtom);
        return {...DEFAULT_SETTINGS, ...storageSettings} as LISettings;
    },
    (get, set, update: Partial<LISettings>) => {
        const storageSettings = get(settingsStoreAtom);
        set(settingsStoreAtom, {...storageSettings, ...update});
    }
);