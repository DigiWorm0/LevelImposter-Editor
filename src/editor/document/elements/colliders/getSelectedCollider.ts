import {DocDraft} from "../../../history/executeCommand";
import {getSelectedElement} from "../getSelectedElement";
import store from "@shared/store";
import {selectedColliderIDAtom} from "../../../selection/stores/colliderSelectionStore";
import GUID from "@shared/types/GUID";

export const getSelectedCollider = (map: DocDraft) => {
    const selectedColliderID = store.get(selectedColliderIDAtom);
    if (!selectedColliderID)
        return undefined;

    return getCollider(map, selectedColliderID);
};

export const getCollider = (map: DocDraft, id: GUID) => {
    const selectedElement = getSelectedElement(map);
    return selectedElement?.properties.colliders?.find(c => c.id === id);
};

