import {useAtom, useAtomValue} from "jotai";
import {settingsAtom} from "@editor/settings/settingsStore";

export default function useSettings() {
    return useAtom(settingsAtom);
}

export function useSettingsValue() {
    return useAtomValue(settingsAtom);
}