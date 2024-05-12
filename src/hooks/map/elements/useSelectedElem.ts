import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import GLOBAL_PROPERTIES from "../../../types/generic/GlobalProps";
import { MaybeGUID } from "../../../types/generic/GUID";
import { MaybeLIElement } from "../../../types/li/LIElement";
import LIProperties from "../../../types/li/LIProperties";
import { elementFamilyAtom } from "./useElements";
import { saveHistoryAtom } from "../useHistory";
import { elementsAtom } from "../useMap";
import { trimAssetsAtom } from "../useMapAssets";

// Atoms
export const selectedElementIDAtom = atom<MaybeGUID>(undefined);
export const selectedElementAtom = atom(
    (get) => {
        const id = get(selectedElementIDAtom);
        const elemAtom = elementFamilyAtom(id);
        return get(elemAtom);
    },
    (get, set, elem: MaybeLIElement) => {
        const elements = get(elementsAtom);
        const index = elements.findIndex((e) => e.id === elem?.id);
        if (index >= 0 && elem) {
            elements[index] = { ...elem };

            const globalProps = GLOBAL_PROPERTIES.filter((globalProp) => globalProp.types.includes(elem?.type ?? ""));
            globalProps.forEach((globalProp) => {
                const prop = globalProp.prop as keyof LIProperties;
                console.log(prop);
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

            set(elementsAtom, [...elements]);
            set(trimAssetsAtom);
            set(saveHistoryAtom);
        }
    }
);
export const isSelectedElemFamily = atomFamily((id: MaybeGUID) => {
    const selectedAtom = atom((get) => {
        const selectedID = get(selectedElementIDAtom);
        const searchParent = (childID: MaybeGUID): boolean => {
            if (childID === undefined)
                return false;
            if (childID === selectedID)
                return true;
            const parentID = get(elementFamilyAtom(childID))?.parentID;
            return searchParent(parentID);
        }
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