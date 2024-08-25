import {atom, useSetAtom} from "jotai";
import generateGUID from "../../utils/strings/generateGUID";
import {selectedElementAtom, selectedElementIDAtom} from "../elements/useSelectedElem";
import {addElementAtCameraAtom} from "../elements/useAddElementAtCamera";

export const duplicateAtom = atom(null, (get, set) => {

    // Get the selected element
    const selectedElem = get(selectedElementAtom);
    if (!selectedElem)
        return;

    // Generate a new ID
    const id = generateGUID();

    // Deep copy the element
    const newElem = JSON.parse(JSON.stringify(selectedElem));

    // Add the element to the camera position
    set(addElementAtCameraAtom, {...newElem, id});

    // Select the new element
    set(selectedElementIDAtom, id);
});

export default function useDuplicate() {
    return useSetAtom(duplicateAtom);
}