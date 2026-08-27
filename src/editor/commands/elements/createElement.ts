import LIElement from "../../../types/li/LIElement";
import {MapCommand} from "../../history/executeCommand";
import GLOBAL_PROPERTIES from "../../../types/li/GlobalProps";
import store from "../../../shared/store";
import {allElementsAtom} from "../../state/documentStore";
import {viewportAtom} from "@/hooks/canvas/useViewport";
import {UNITY_SCALE} from "@/types/amongus/Constants";
import getDefaultZ from "../../../utils/map/getDefaultZ";
import {selectedColliderIDAtom} from "../../state/selection/colliderSelectionStore";
import selectElementID from "../../selection/selectElementID";

export const createElement = (elem: LIElement): MapCommand => map => {

    // Add global properties to the element
    // TODO: This is a hacky workaround to create map-level properties in individual elements.
    const globalProps = GLOBAL_PROPERTIES.filter((globalProp) => globalProp.types.includes(elem.type));
    const allElements = [...store.get(allElementsAtom)];
    for (const globalProp of globalProps) {
        const prop = globalProp.prop as keyof LIElement["properties"];
        const existingElement = allElements.find(e => globalProp.types.includes(e.type));
        if (existingElement)
            // @ts-expect-error `prop` is shared between the two elements
            elem.properties[prop] = existingElement.properties[prop];
    }

    // Add the element to the map
    map.elements.push(elem);

    // Select element
    selectElementID(elem.id);
    store.set(selectedColliderIDAtom, undefined);   // <-- Deselect colliders

    // TODO: if selectedColliderID doesn't exist on selectedElement, set selectedColliderID to null
};

export const createElementAtCamera = (elem: LIElement): MapCommand => map => {
    const viewport = store.get(viewportAtom);
    elem.x = (viewport?.center.x ?? 0) / UNITY_SCALE;
    elem.y = (viewport?.center.y ?? 0) / -UNITY_SCALE;
    elem.z = getDefaultZ(elem);

    createElement(elem)(map);
};