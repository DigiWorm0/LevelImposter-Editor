import GUID from "../../../types/common/GUID";
import {EditorCommand} from "../../history/executeCommand";
import {getSelectedElement} from "../getSelectedElement";

export const deleteCollider = (colliderID: GUID): EditorCommand => map => {
    const selectedElement = getSelectedElement(map);
    if (!selectedElement)
        return;

    selectedElement.properties.colliders = selectedElement.properties.colliders?.filter(c => c.id !== colliderID);
};