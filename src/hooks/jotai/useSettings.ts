import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { settingsAtom } from "./Jotai";

export default function useSettings() {
    return useAtom(settingsAtom);
}

export function useSetSettings() {
    return useSetAtom(settingsAtom);
}

export function useSettingsValue() {
    return useAtomValue(settingsAtom);
}