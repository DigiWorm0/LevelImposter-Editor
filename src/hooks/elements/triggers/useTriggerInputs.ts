import {InputTriggerDB} from "@/db/TriggerDB";
import LIElement from "../../../types/li/LIElement";
import compareArrays from "../../../utils/common/compareArrays";
import {atom, useAtomValue} from "jotai";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";
import {documentAtom} from "@editor/document/documentStore";

let previousTriggerInputs: LIElement[] = [];

export const triggerInputsAtom = atom((get) => {
    const document = get(documentAtom);
    const allElements = Object.values(document.elements);
    // TODO: Refactor this out

    const selectedElemID = get(selectedElementIDAtom);
    const filteredElements = allElements.filter((elem) =>
        elem.type in InputTriggerDB && elem.id !== selectedElemID
    );

    // Only update if the array has changed
    if (!compareArrays(filteredElements, previousTriggerInputs))
        previousTriggerInputs = filteredElements;

    return filteredElements;
});

export default function useTriggerInputs() {
    return useAtomValue(triggerInputsAtom);
}