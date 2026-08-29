import {atom} from "jotai";
import {selectedElementAtom} from "./elementSelectionStore";

export const selectedTriggerIDAtom = atom<string | undefined>(undefined);

// Calculated
export const selectedTriggerAtom = atom((get) => {
    const selectedElem = get(selectedElementAtom);
    const selectedTriggerID = get(selectedTriggerIDAtom);
    return selectedElem?.properties.triggers?.find(t => t.id === selectedTriggerID);
});
export const isTriggerSelectedAtom = atom((get) => get(selectedTriggerIDAtom) != undefined);