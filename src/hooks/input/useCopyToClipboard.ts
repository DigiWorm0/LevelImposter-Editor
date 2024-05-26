import { useSetAtom } from "jotai";
import { atom } from "jotai/index";
import LIClipboard from "../../types/li/LIClipboard";
import LIElement from "../../types/li/LIElement";
import { selectedElementAtom } from "../elements/useSelectedElem";
import { mapAtom } from "../map/useMap";
import { localClipboardAtom } from "./useClipboard";

const copyToClipboardAtom = atom(null, (get, set) => {

    // Get the selected element
    const selectedElem = get(selectedElementAtom);
    if (!selectedElem)
        return;

    // Create a clipboard object
    const clipboardData: LIClipboard = {
        data: [selectedElem]
    };

    // Recursively add children to the clipboard
    const map = get(mapAtom);
    const addChildren = (elem: LIElement) => {
        map.elements.forEach(e => {
            if (e.parentID === elem.id) {
                clipboardData.data.push(e);
                addChildren(e);
            }
        });
    };

    // Add children
    addChildren(selectedElem);

    // Serialize the clipboard object
    const clipboardJSON = JSON.stringify(clipboardData);

    // Write to local clipboard
    set(localClipboardAtom, clipboardJSON);

    // Write to the navigator clipboard
    if (navigator.clipboard.writeText)
        navigator.clipboard.writeText(clipboardJSON);
});

export default function useCopyToClipboard() {
    return useSetAtom(copyToClipboardAtom);
}