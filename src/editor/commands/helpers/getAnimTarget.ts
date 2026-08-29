import {MapDraft} from "@editor/history/executeCommand";
import GUID from "@/types/common/GUID";
import {getSelectedElement} from "@editor/commands/helpers/getSelectedElement";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";

export const getAnimTarget = (map: MapDraft, id: GUID) => {
    const selectedElement = getSelectedElement(map);
    return selectedElement?.properties.animTargets?.find(c => c.id === id);
};

export const getAnimTargetProperty = (
    map: MapDraft,
    targetID: GUID,
    property: LIAnimPropertyType
) => {
    const animTarget = getAnimTarget(map, targetID);
    return animTarget?.properties[property];
};