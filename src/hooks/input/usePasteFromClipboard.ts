/*
       Paste Operation
 */
import { atom } from "jotai/index";
import LIElement from "../../types/li/LIElement";
import GUID, { MaybeGUID } from "../../types/generic/GUID";
import generateGUID from "../../utils/generateGUID";
import { addElementAtom } from "../map/elements/useElements";
import { selectedElementIDAtom } from "../map/elements/useSelectedElem";
import { clipboardAtom } from "./useClipboard";
import { useSetAtom } from "jotai";

const pasteFromClipboardAtom = atom(null, async (get, set) => {
    // Get the clipboard data
    const clipboardData = await get(clipboardAtom);
    if (!clipboardData)
        return;

    // Get Elements
    const elements = clipboardData.data as LIElement[];

    // Map of old IDs to new IDs
    const newIDs = new Map<GUID, GUID>();

    // Gets the new ID from an old ID
    const getID = (id: MaybeGUID) => {
        if (id === undefined)
            return undefined;
        if (newIDs.has(id))
            return newIDs.get(id);
        if (elements.find(e => e.id === id)) {
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
        const newID = generateGUID();
        const newName = elem.name + " (copy)";
        newIDs.set(elem.id, newID);

        // Add the element to the map
        set(addElementAtom, {
            ...elem,

            // New ID, name, and position
            id: newID,
            name: newName,
            x: elem.x + 1,

            // Set new IDs
            parentID: getID(elem.parentID),
            properties: {
                ...elem.properties,
                parent: getID(elem.properties.parent),
                leftVent: getID(elem.properties.leftVent),
                rightVent: getID(elem.properties.rightVent),
                middleVent: getID(elem.properties.middleVent),
                teleporter: getID(elem.properties.teleporter)
            }
        });
    });

    // Set the selected ID
    set(selectedElementIDAtom, newIDs.get(elements[0].id));
});

export default function usePasteFromClipboard() {
    return useSetAtom(pasteFromClipboardAtom);
}