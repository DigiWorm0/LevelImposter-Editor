import GUID from "../../types/common/GUID";
import {EditorCommand} from "../history/executeCommand";
import LIProperties from "../../types/li/LIProperties";
import store from "../../shared/store";
import {selectedElementIDAtom} from "../selection/stores/elementSelectionStore";

export const setElementProp = <T extends keyof LIProperties>(
    elementID: GUID,
    prop: T,
    newValue: LIProperties[T]
): EditorCommand => map => {
    map.elements[elementID].properties[prop] = newValue;
};

export const setSelectedElementProp = <T extends keyof LIProperties>(
    prop: T,
    newValue: LIProperties[T]
): EditorCommand => map => {
    const selectedElementID = store.get(selectedElementIDAtom);
    if (!selectedElementID)
        return;

    setElementProp(selectedElementID, prop, newValue)(map);
};