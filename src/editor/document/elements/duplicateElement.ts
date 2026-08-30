import {EditorCommand} from "../../history/executeCommand";
import {createElementAtCamera} from "./createElement";
import store from "@shared/store";
import {selectedElementAtom} from "../../selection/stores/elementSelectionStore";
import selectElementID from "../../selection/selectElementID";
import {MapElement} from "@editor/document/types/MapDocument";
import {generateGUID} from "@shared/types/GUID";

export const duplicateElement = (elem: MapElement): EditorCommand => map => {
    const newElem = JSON.parse(JSON.stringify(elem)); // <-- Deep copy the element
    const id = generateGUID();  // <-- Generate a new ID for the duplicated element

    createElementAtCamera({...newElem, id})(map);
    selectElementID(id);
};

export const duplicateSelectedElement = (): EditorCommand => map => {
    const selectedElem = store.get(selectedElementAtom);
    if (!selectedElem)
        return;
    duplicateElement(selectedElem)(map);
};