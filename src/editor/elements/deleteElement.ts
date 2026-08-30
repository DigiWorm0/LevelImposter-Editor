import GUID from "../../types/common/GUID";
import {EditorCommand} from "../history/executeCommand";
import store from "../../shared/store";
import {selectedElementIDsAtom} from "../selection/stores/elementSelectionStore";
import {deselectAll} from "@editor/selection/deselectAll";

export const deleteElement = (elementID: GUID): EditorCommand => map => {
    const recursivelyDeleteElement = (id: GUID) => {
        // Recurse through children and delete them first
        const element = map.elements[id];
        for (const childID of element.childrenIDs)
            recursivelyDeleteElement(childID);

        // Delete the element itself
        console.log(`Removed ${id} (child of ${elementID})`);
        delete map.elements[id];
    };

    recursivelyDeleteElement(elementID);
    deselectAll();
};

export const deleteSelectedElements = (): EditorCommand => map => {
    const selectedElementIDs = store.get(selectedElementIDsAtom);
    for (const id of selectedElementIDs)
        deleteElement(id)(map);
};