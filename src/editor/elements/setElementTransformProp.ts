import GUID from "../../types/common/GUID";
import {MapCommand} from "../history/executeCommand";
import store from "../../shared/store";
import {selectedElementIDAtom} from "../selection/stores/elementSelectionStore";
import LIElement from "@/types/li/LIElement";

export const setElementTransformProp = <T extends keyof LIElement>(
    elementID: GUID,
    prop: T,
    newValue: LIElement[T]
): MapCommand => map => {
    const element = map.elements.find(elem => elem.id === elementID);
    if (!element) {
        console.warn(`Element with ID ${elementID} not found.`);
        return;
    }

    element[prop] = newValue;
};

export const setSelectedElementTransformProp = <T extends keyof LIElement>(
    prop: T,
    newValue: LIElement[T]
): MapCommand => map => {
    const selectedElementID = store.get(selectedElementIDAtom);
    if (!selectedElementID)
        return;

    setElementTransformProp(selectedElementID, prop, newValue)(map);
};