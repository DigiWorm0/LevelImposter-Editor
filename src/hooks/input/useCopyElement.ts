import {useSetAtom} from "jotai";
import {atom} from "jotai/index";
import LIClipboard from "../../types/li/LIClipboard";
import LIElement from "../../types/li/LIElement";
import {mapAtom} from "../map/useMap";
import {clipboardAtom} from "./useClipboard";
import {selectedElementsAtom} from "../elements/useSelectedElements";

const copyElementAtom = atom(null, (get, set) => {

    // Get the selected element
    const selectedElements = get(selectedElementsAtom);
    if (selectedElements.length === 0)
        return;

    // Create a clipboard object
    const clipboardData: LIClipboard = {
        elem: selectedElements,
        focusIDs: selectedElements.map(elem => elem.id),
    };

    // Recursively add children to the clipboard
    const map = get(mapAtom);
    const addChildren = (elem: LIElement) => {
        for (const child of map.elements) {

            // Check if the element is a child of the current element
            if (child.parentID !== elem.id)
                continue;

            // Add children to the clipboard
            clipboardData.elem?.push(child);

            // Recursively add children of the child
            addChildren(child);
        }
    };

    // Add children
    for (const selectedElem of selectedElements)
        addChildren(selectedElem);

    // Set the clipboard
    set(clipboardAtom, clipboardData);
});

export default function useCopyElement() {
    return useSetAtom(copyElementAtom);
}