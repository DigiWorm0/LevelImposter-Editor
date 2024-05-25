import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { LIPropName } from "../../types/li/LIProperties";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedElementPropAtom = atomFamily((propName: LIPropName) => {
    return atom((get) => {
        const selectedElement = get(selectedElementAtom);
        return selectedElement?.properties[propName];
    }, (get, set, newValue: any) => {
        const selectedElement = get(selectedElementAtom);
        if (selectedElement) {
            const newProperties = { ...selectedElement.properties, [propName]: newValue };
            set(selectedElementAtom, { ...selectedElement, properties: newProperties });
        }
    });
});

// Hooks
export default function useSelectedElemProp<T>(propName: LIPropName) {
    return useAtom(selectedElementPropAtom(propName)) as [T | undefined, (newValue: T) => void];
}

export function useSetSelectedElemProp<T>(propName: LIPropName) {
    return useSetAtom(selectedElementPropAtom(propName)) as (newValue: T) => void;
}

export function useSelectedElemPropValue<T>(propName: LIPropName) {
    return useAtomValue(selectedElementPropAtom(propName)) as T | undefined;
}