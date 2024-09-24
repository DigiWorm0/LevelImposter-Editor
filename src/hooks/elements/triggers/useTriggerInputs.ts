import {atom} from "jotai/index";
import {elementsAtom} from "../../map/useMap";
import {selectedElementIDAtom} from "../useSelectedElem";
import {InputTriggerDB} from "../../../db/TriggerDB";
import LIElement from "../../../types/li/LIElement";
import compareArrays from "../../../utils/math/compareArrays";
import {useAtomValue} from "jotai";

let previousTriggerInputs: LIElement[] = [];

export const triggerInputsAtom = atom((get) => {
    const elements = get(elementsAtom);
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