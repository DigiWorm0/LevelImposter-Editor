import { useSetAtom } from "jotai";
import { atom } from "jotai/index";
import GLOBAL_PROPERTIES from "../../types/generic/GlobalProps";
import LIElement from "../../types/li/LIElement";
import { saveHistoryAtom } from "../map/history/useHistory";
import { elementsAtom } from "../map/useMap";

export const addElementAtom = atom(null, (get, set, elem: LIElement) => {

    // Add global properties to the element
    const globalProps = GLOBAL_PROPERTIES.filter((globalProp) => globalProp.types.includes(elem.type));
    const allElements = [...get(elementsAtom)];
    globalProps.forEach((globalProp) => {
        const prop = globalProp.prop as keyof LIElement["properties"];
        allElements.forEach((e) => {
            if (globalProp.types.includes(e.type)) {
                elem = {
                    ...elem,
                    properties: {
                        ...elem.properties,
                        [prop]: e.properties[prop],
                    },
                };
                return;
            }
        });
    });

    // Add the element to the map
    set(elementsAtom, [...get(elementsAtom), elem]);
    set(saveHistoryAtom);
});

// Debug
addElementAtom.debugLabel = "addElementAtom";

export default function useAddElement() {
    return useSetAtom(addElementAtom);
}