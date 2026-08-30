import store from "../../../shared/store";
import {documentAtom} from "../../document/documentStore";
import {selectedElementsAtom} from "../../selection/stores/elementSelectionStore";
import setClipboard from "@editor/clipboard/setClipboard";
import {MapElement} from "@editor/document/types/MapDocument";
import ClipboardContent from "@editor/clipboard/ClipboardContent";

export const copyElementsToClipboard = (elements: MapElement[]) => {
    // Create a clipboard object
    const clipboardData: ClipboardContent = {
        elem: elements,
        focusIDs: elements.map(elem => elem.id),
    };

    // Recursively add children to the clipboard
    const currentDocument = store.get(documentAtom);

    const addChildren = (elem: MapElement) => {
        for (const childID of elem.childrenIDs) {
            const child = currentDocument.elements[childID];
            clipboardData.elem?.push(child);
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