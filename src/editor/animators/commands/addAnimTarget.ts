import GUID from "@/types/common/GUID";
import {MapCommand} from "@editor/history/executeCommand";
import {getSelectedElement} from "@editor/elements/getSelectedElement";

export const addAnimTarget = (targetID: GUID): MapCommand => map => {
    const selectedElement = getSelectedElement(map);
    if (!selectedElement)
        throw new Error("No selected element");

    selectedElement.properties.animTargets ??= [];
    selectedElement.properties.animTargets.push({
        id: targetID,
        properties: {}
    });
};