import LIElement from "../../types/li/LIElement";
import {MapCommand} from "../history/executeCommand";
import generateGUID from "../../utils/strings/generateGUID";
import {createElementAtCamera} from "./createElement";
import store from "../../shared/store";
import {selectedElementAtom} from "../selection/stores/elementSelectionStore";
import selectElementID from "../selection/selectElementID";

export const duplicateElement = (elem: LIElement): MapCommand => map => {
    const newElem = JSON.parse(JSON.stringify(elem)); // <-- Deep copy the element
    const id = generateGUID();  // <-- Generate a new ID for the duplicated element

    createElementAtCamera({...newElem, id})(map);
    selectElementID(id);
};

export const duplicateSelectedElement = (): MapCommand => map => {
    const selectedElem = store.get(selectedElementAtom);
    if (!selectedElem)
        return;
    duplicateElement(selectedElem)(map);
};