import GUID from "../../types/common/GUID";
import {MapCommand} from "../history/executeCommand";
import LIProperties from "../../types/li/LIProperties";
import store from "../../shared/store";
import {selectedElementIDAtom} from "../selection/stores/elementSelectionStore";

export const setElementProp = <T extends keyof LIProperties>(
    elementID: GUID,
    prop: T,
    newValue: LIProperties[T]
): MapCommand => map => {
    const element = map.elements.find(elem => elem.id === elementID);
    if (!element) {
        console.warn(`Element with ID ${elementID} not found.`);
        return;
    }

    element.properties[prop] = newValue;
};

export const setSelectedElementProp = <T extends keyof LIProperties>(
    prop: T,
    newValue: LIProperties[T]
): MapCommand => map => {
    const selectedElementID = store.get(selectedElementIDAtom);
    if (!selectedElementID)
        return;

    setElementProp(selectedElementID, prop, newValue)(map);
};