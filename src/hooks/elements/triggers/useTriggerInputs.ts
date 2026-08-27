import {allElementsAtom} from "@editor/state/documentStore";
import {InputTriggerDB} from "@/db/TriggerDB";
import LIElement from "../../../types/li/LIElement";
import compareArrays from "../../../utils/common/compareArrays";
import {atom, useAtomValue} from "jotai";
import {selectedElementIDAtom} from "@editor/state/selection/elementSelectionStore";

let previousTriggerInputs: LIElement[] = [];

export const triggerInputsAtom = atom((get) => {
    const elements = get(allElementsAtom);
    const selectedElemID = get(selectedElementIDAtom);
    const filteredElements = elements.filter((elem) =>
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