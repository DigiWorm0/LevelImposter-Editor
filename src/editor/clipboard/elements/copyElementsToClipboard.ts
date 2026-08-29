import LIClipboard from "../../../types/li/LIClipboard";
import LIElement from "../../../types/li/LIElement";
import store from "../../../shared/store";
import {mapAtom} from "../../documentStore";
import {selectedElementsAtom} from "../../selection/stores/elementSelectionStore";
import setClipboard from "@editor/clipboard/setClipboard";

export const copyElementsToClipboard = (elements: LIElement[]) => {
    // Create a clipboard object
    const clipboardData: LIClipboard = {
        elem: elements,
        focusIDs: elements.map(elem => elem.id),
    };

    // Recursively add children to the clipboard
    const map = store.get(mapAtom);
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
    for (const element of elements)
        addChildren(element);

    // Set the clipboard
    setClipboard(clipboardData);
};

export const copySelectedElementsToClipboard = () => {
    const selectedElements = store.get(selectedElementsAtom);
    if (selectedElements.length > 0)
        copyElementsToClipboard(selectedElements);
};