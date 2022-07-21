import { useAtom, useAtomValue } from "jotai";
import { settingsAtom } from "./Jotai";

export default function useSettings() {
    return useAtom(settingsAtom);
}

export function useSetSettings() {
    return useAtom(settingsAtom);
}

export function useSettingsValue() {
    return useAtomValue(settingsAtom);
}