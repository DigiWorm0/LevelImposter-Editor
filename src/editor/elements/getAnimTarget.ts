import {DocDraft} from "@editor/history/executeCommand";
import GUID from "@/shared/types/GUID";
import {getSelectedElement} from "@editor/elements/getSelectedElement";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";

export const getAnimTarget = (map: DocDraft, id: GUID) => {
    const selectedElement = getSelectedElement(map);
    return selectedElement?.properties.animTargets?.find(c => c.id === id);
};

export const getAnimTargetProperty = (
    map: DocDraft,
    targetID: GUID,
    property: LIAnimPropertyType
) => {
    const animTarget = getAnimTarget(map, targetID);
    return animTarget?.properties[property];
};