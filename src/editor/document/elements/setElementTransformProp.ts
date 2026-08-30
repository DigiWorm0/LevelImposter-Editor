import GUID from "@shared/types/GUID";
import {EditorCommand} from "../../history/executeCommand";
import store from "@shared/store";
import {selectedElementIDAtom} from "../../selection/stores/elementSelectionStore";
import {MapElement} from "@editor/document/types/MapDocument";

export const setElementTransformProp = <T extends keyof MapElement>(
    elementID: GUID,
    prop: T,
    newValue: MapElement[T]
): EditorCommand => map => {
    map.elements[elementID][prop] = newValue;
};

export const setSelectedElementTransformProp = <T extends keyof MapElement>(
    prop: T,
    newValue: MapElement[T]
): EditorCommand => map => {
    const selectedElementID = store.get(selectedElementIDAtom);
    if (!selectedElementID)
        return;

    setElementTransformProp(selectedElementID, prop, newValue)(map);
};