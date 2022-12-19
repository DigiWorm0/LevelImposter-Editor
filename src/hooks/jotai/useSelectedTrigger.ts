import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { MaybeLITrigger } from "../../types/li/LITrigger";
import { saveHistoryAtom } from "./useHistory";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedTriggerIDAtom = atom<string | undefined>(undefined);
export const selectedTriggerAtom = atom(
    (get) => {
        const selectedElem = get(selectedElementAtom);
        const selectedTriggerID = get(selectedTriggerIDAtom);
        const selectedTrigger = selectedElem?.properties.triggers?.find(
            (trigger) => trigger.id === selectedTriggerID
        );
        return selectedTrigger;
    },
    (get, set, trigger: MaybeLITrigger) => {
        const selectedElem = get(selectedElementAtom);
        const triggers = selectedElem?.properties.triggers || [];
        const index = triggers?.findIndex((c) => c.id === trigger?.id);
        if (selectedElem && index != undefined && index >= 0 && trigger != undefined) {
            triggers[index] = trigger;
            set(selectedElementAtom, { ...selectedElem, properties: { ...selectedElem?.properties, triggers: [...triggers] } });
            set(saveHistoryAtom);
        } else if (selectedElem && trigger != undefined) {
            triggers.push(trigger);
            set(selectedElementAtom, { ...selectedElem, properties: { ...selectedElem?.properties, triggers: [...triggers] } });
            set(saveHistoryAtom);
        }
    }
);
export const isSelectedTriggerAtom = atom(
    (get) => {
        return get(selectedTriggerIDAtom) != undefined;
    }
);

// Debug
selectedTriggerIDAtom.debugLabel = "selectedTriggerIDAtom";
selectedTriggerAtom.debugLabel = "selectedTriggerAtom";
isSelectedTriggerAtom.debugLabel = "isSelectedTriggerAtom";

// Hooks
export function useSelectedTriggerID() {
    return useAtom(selectedTriggerIDAtom);
}
export function useSetSelectedTriggerID() {
    return useSetAtom(selectedTriggerIDAtom);
}
export function useSelectedTriggerIDValue() {
    return useAtomValue(selectedTriggerIDAtom);
}
export default function useSelectedTrigger() {
    return useAtom(selectedTriggerAtom);
}
export function useSetSelectedTrigger() {
    return useSetAtom(selectedTriggerAtom);
}
export function useSelectedTriggerValue() {
    return useAtomValue(selectedTriggerAtom);
}
export function useIsSelectedTrigger() {
    return useAtomValue(isSelectedTriggerAtom);
}