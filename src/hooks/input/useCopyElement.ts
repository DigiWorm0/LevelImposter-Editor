import {useSetAtom} from "jotai";
import {atom} from "jotai/index";
import LIClipboard from "../../types/li/LIClipboard";
import LIElement from "../../types/li/LIElement";
import {selectedElementAtom} from "../elements/useSelectedElem";
import {mapAtom} from "../map/useMap";
import {clipboardAtom} from "./useClipboard";

const copyElementAtom = atom(null, (get, set) => {

    // Get the selected element
    const selectedElem = get(selectedElementAtom);
    if (!selectedElem)
        return;

    // Create a clipboard object
    const clipboardData: LIClipboard = {
        elem: [selectedElem]
    };

    // Recursively add children to the clipboard
    const map = get(mapAtom);
    const addChildren = (elem: LIElement) => {
        map.elements.forEach(e => {
            if (e.parentID === elem.id) {
                clipboardData.elem?.push(e);
                addChildren(e);
            }
        });
    };

    // Add children
    addChildren(selectedElem);

    // Set the clipboard
    set(clipboardAtom, clipboardData);
});

export default function useCopyElement() {
    return useSetAtom(copyElementAtom);
}