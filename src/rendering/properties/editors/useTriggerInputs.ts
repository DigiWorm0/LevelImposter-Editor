import {InputTriggerDB} from "@/db/TriggerDB";
import {atom, useAtomValue} from "jotai";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";
import {docElementsAtom} from "@editor/document/documentStore";

export const triggerInputsAtom = atom((get) => {
    const allElements = Object.values(get(docElementsAtom));
    const selectedElemID = get(selectedElementIDAtom);
    return allElements.filter((elem) =>
        elem.type in InputTriggerDB && elem.id !== selectedElemID
    );
});

export default function useTriggerInputs() {
    return useAtomValue(triggerInputsAtom);
}
