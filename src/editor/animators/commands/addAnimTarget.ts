import GUID from "@/shared/types/GUID";
import {EditorCommand} from "@editor/history/executeCommand";
import {getSelectedElement} from "@editor/document/elements/getSelectedElement";

export const addAnimTarget = (targetID: GUID): EditorCommand => map => {
    const selectedElement = getSelectedElement(map);
    if (!selectedElement)
        throw new Error("No selected element");

    selectedElement.properties.animTargets ??= [];
    selectedElement.properties.animTargets.push({
        id: targetID,
        properties: {}
    });
};