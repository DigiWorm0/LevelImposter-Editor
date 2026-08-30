import {atomWithStorage} from "jotai/utils";
import {DefaultEditorSettings, EditorSettings} from "@editor/settings/EditorSettings";
import {atom} from "jotai";

export const rawSettingsAtom = atomWithStorage<Partial<EditorSettings>>("settings", {});

// Calculated
export const settingsAtom = atom((get) => {
    const storageSettings = get(rawSettingsAtom);
    return {...DefaultEditorSettings, ...storageSettings} as EditorSettings;
}, (get, set, update: Partial<EditorSettings>) => {
    const storageSettings = get(rawSettingsAtom);
    set(rawSettingsAtom, {
        ...storageSettings,
        ...update
    });
});