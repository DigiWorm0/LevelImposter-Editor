import executeCommand, {EditorCommand} from "../../history/executeCommand";
import GUID, {MaybeGUID} from "../../../types/common/GUID";
import generateGUID from "../../../utils/strings/generateGUID";
import getClipboard from "../getClipboard";
import ClipboardContent from "../ClipboardContent";
import {createElement} from "@editor/elements/createElement";
import store from "../../../shared/store";
import {selectedElementIDsAtom} from "../../selection/stores/elementSelectionStore";

/**
 * Pastes elements from the clipboard into the map.
 * Internally calls `executeCommand` after getting clipboard content asynchronously.
 */
export const pasteElementsFromClipboard = async () => {
    // Get the clipboard data
    const clipboardData = await getClipboard();
    if (!clipboardData)
        return;

    return executeCommand(pasteElementsFromClipboardContent(clipboardData));
};

const pasteElementsFromClipboardContent = (
    clipboardContent: ClipboardContent
): EditorCommand => map => {

    // Get Elements
    const elements = clipboardContent.elem;
    if (!elements)
        return;

    // Function to get a new ID from an old ID
    // Generates a new ID if reference something in the same selection
    // Otherwise, reuse the existing ID to maintain references to elements not in the selection
    const newIDs = new Map<GUID, GUID>();

    const getNewIDFromOldID = (id: MaybeGUID, alwaysMakeNewID: boolean = false) => {
        if (id === undefined)
            return undefined;

        if (newIDs.has(id))
            return newIDs.get(id);

        const elementIsInSelection = elements.some(elem => elem.id === id);
        if (elementIsInSelection || alwaysMakeNewID) {
            const newID = generateGUID();
            newIDs.set(id, newID);
            return newID;
        }

        return id;
    };

    // Iterate through each element
    // Add each element to the map
    elements.forEach(elem => {

        // Generate a new name + id
        const newID = getNewIDFromOldID(elem.id, true) || generateGUID();

        // Check if the parent is in the selection
        const isParentInSelection = elements.some(e => e.id === elem.parentID);

        // Add the element to the map
        createElement({
            ...elem,

            // New ID, name, and position
            id: newID,
            name: `${elem.name} (Copy)`,
            x: isParentInSelection ? elem.x : elem.x + 1,

            // Set new IDs
            parentID: getNewIDFromOldID(elem.parentID),
            properties: {
                ...elem.properties,
                parent: getNewIDFromOldID(elem.properties.parent),
                leftVent: getNewIDFromOldID(elem.properties.leftVent),
                rightVent: getNewIDFromOldID(elem.properties.rightVent),
                middleVent: getNewIDFromOldID(elem.properties.middleVent),
                teleporter: getNewIDFromOldID(elem.properties.teleporter)
            }
        })(map);
    });

    if (!clipboardContent.focusIDs)
        return;

    // Set the selected ID
    // (Uses new IDs for selected elements if they are in the selection)
    store.set(
        selectedElementIDsAtom,
        clipboardContent.focusIDs.map(id => newIDs.get(id) || id)
    );
};