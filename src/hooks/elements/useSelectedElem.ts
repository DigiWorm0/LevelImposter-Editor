import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/common/GUID";
import GLOBAL_PROPERTIES from "../../types/li/GlobalProps";
import {MaybeLIElement} from "../../types/li/LIElement";
import LIProperties from "../../types/li/LIProperties";
import {elementsAtom} from "../map/useMap";
import {elementAtomFamily} from "./useElements";
import {selectedElementIDsAtom} from "../selection/useSelectedElementIDs";
import {isElementSelectedAtomFamily} from "./useIsElementSelected";
import {saveHistoryAtom} from "../map/history/useHistory";

// Atoms
export const selectedElementIDAtom = atom((get) => {
    const selectedIDs = get(selectedElementIDsAtom);
    return selectedIDs.length === 1 ? selectedIDs[0] : undefined;
}, (_, set, id: MaybeGUID) => {
    if (id === undefined) {
        set(selectedElementIDsAtom, []);
        return;
    }

    set(selectedElementIDsAtom, [id]);
});

export const selectedElementAtom = atom(
    (get) => {
        const id = get(selectedElementIDAtom);
        const elemAtom = elementAtomFamily(id);
        return get(elemAtom);
    },
    (get, set, elem: MaybeLIElement) => {
        const elements = [...get(elementsAtom)];
        const index = elements.findIndex((e) => e.id === elem?.id);
        if (index >= 0 && elem) {
            elements[index] = {...elem};

            // TODO: Improve handling of global properties
            const globalProps = GLOBAL_PROPERTIES.filter((globalProp) => globalProp.types.includes(elem?.type ?? ""));
            globalProps.forEach((globalProp) => {
                const prop = globalProp.prop as keyof LIProperties;
                elements.forEach((e, index) => {
                    if (globalProp.types.includes(e.type) && e.id !== elem?.id) {
                        elements[index] = {
                            ...e,
                            properties: {
                                ...e.properties,
                                [prop]: elem.properties[prop]
                            }
                        };
                    }
                });
            });

            set(elementsAtom, elements);
        }

        // Save Undo/Redo history
        set(saveHistoryAtom);
    }
);
export const isSelectedElemFamily = atomFamily((id: MaybeGUID) => {
    const selectedAtom = atom((get) => {
        const searchParent = (childID: MaybeGUID): boolean => {
            if (childID === undefined)
                return false;
            if (get(isElementSelectedAtomFamily(childID)))
                return true;
            const parentID = get(elementAtomFamily(childID))?.parentID;
            return searchParent(parentID);
        };
        return searchParent(id);
    });
    selectedAtom.debugLabel = `isSelectedElemFamily(${id})`;
    return selectedAtom;
});

// Debug
selectedElementIDAtom.debugLabel = "selectedElementIDAtom";
selectedElementAtom.debugLabel = "selectedElementAtom";

// Hooks
export function useSelectedElemID() {
    return useAtom(selectedElementIDAtom);
}

export function useSetSelectedElemID() {
    return useSetAtom(selectedElementIDAtom);
}

export function useSelectedElemIDValue() {
    return useAtomValue(selectedElementIDAtom);
}

export default function useSelectedElem() {
    return useAtom(selectedElementAtom);
}

export function useSetSelectedElem() {
    return useSetAtom(selectedElementAtom);
}

export function useSelectedElemValue() {
    return useAtomValue(selectedElementAtom);
}

export function useIsSelectedElem(id: MaybeGUID) {
    return useAtomValue(isSelectedElemFamily(id));
}