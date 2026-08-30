import {EditorCommand} from "../history/executeCommand";
import GLOBAL_PROPERTIES from "../../types/li/GlobalProps";
import store from "../../shared/store";
import {viewportAtom} from "@/hooks/canvas/useViewport";
import {UNITY_SCALE} from "@/types/amongus/Constants";
import selectElementID from "../selection/selectElementID";
import {MapElement} from "@editor/document/types/MapDocument";
import {MapElementProperties} from "@editor/document/types/MapElementProperties";
import generateGUID from "@/utils/strings/generateGUID";
import getElemVisibility, {ElemVisibility} from "@/utils/map/getMapVisibility";

export const createElement = (partialElem: Partial<MapElement>): EditorCommand => map => {
    const elem = populatePartialElement(partialElem);

    // Add global properties to the element
    // TODO: This is a hacky workaround to create map-level properties in individual elements.
    const globalProps = GLOBAL_PROPERTIES.filter((globalProp) => globalProp.types.includes(partialElem.type ?? ""));

    const allElements = Object.values(map.elements);
    for (const globalProp of globalProps) {
        const prop = globalProp.prop as keyof MapElementProperties;
        const existingElement = allElements.find(e => globalProp.types.includes(e.type ?? ""));
        if (existingElement)
            elem.properties[prop] = existingElement.properties[prop];
    }

    // Add the element to the map
    map.elements[elem.id] = elem;

    // Select element
    selectElementID(elem.id);
};

export const createElementAtCamera = (partialElem: Partial<MapElement>): EditorCommand => map => {
    const viewport = store.get(viewportAtom);
    partialElem.x = (viewport?.center.x ?? 0) / UNITY_SCALE;
    partialElem.y = (viewport?.center.y ?? 0) / -UNITY_SCALE;
    partialElem.z = getDefaultZ(populatePartialElement(partialElem));

    createElement(partialElem)(map);
};

const getDefaultZ = (elem: MapElement) => {
    if (elem.type === "util-layer")
        return 0;
    if (elem.type?.startsWith("room-"))
        return 20;
    if (getElemVisibility(elem) === ElemVisibility.Invisible || elem.type === "util-room")
        return -20;
    return 0;
};

const populatePartialElement = (partialElem: Partial<MapElement>): MapElement => {
    return {
        id: generateGUID(),
        name: partialElem.type ?? "",
        type: "util-blank",
        x: 0,
        y: 0,
        z: 0,
        xScale: 1,
        yScale: 1,
        rotation: 0,
        childrenIDs: [],
        properties: {},
        ...partialElem
    };
}