import GUID from "../../../types/common/GUID";
import {MapCommand} from "../../history/executeCommand";
import {getSelectedElement} from "../getSelectedElement";

export const deleteCollider = (colliderID: GUID): MapCommand => map => {
    const selectedElement = getSelectedElement(map);
    if (!selectedElement)
        return;

    selectedElement.properties.colliders = selectedElement.properties.colliders?.filter(c => c.id !== colliderID);
};