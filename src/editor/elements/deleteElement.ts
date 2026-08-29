import GUID from "../../types/common/GUID";
import {MapCommand} from "../history/executeCommand";
import {elementChildIDsAtomFamily} from "@/hooks/elements/useElementChildIDs";
import store from "../../shared/store";
import {selectedColliderIDAtom} from "../selection/stores/colliderSelectionStore";
import {selectedElementIDsAtom} from "../selection/stores/elementSelectionStore";

import {elementAtomFamily} from "../documentStore";

export const deleteElement = (elementID: GUID): MapCommand => map => {
    const recursivelyDeleteElement = (childID: GUID) => {
        console.log(`Removed ${childID} (child of ${elementID})`);
        elementAtomFamily.remove(childID);
        map.elements = map.elements.filter(elem => elem.id !== childID);

        // TODO: Recursively find children an alternative way that doesn't require the use of atoms
        const childIDs = store.get(elementChildIDsAtomFamily(childID));
        childIDs.forEach(recursivelyDeleteElement);
    };

    recursivelyDeleteElement(elementID);

    store.set(selectedElementIDsAtom, []);
    store.set(selectedColliderIDAtom, undefined);
};

export const deleteSelectedElements = (): MapCommand => map => {
    const selectedElementIDs = store.get(selectedElementIDsAtom);
    for (const id of selectedElementIDs)
        deleteElement(id)(map);
};