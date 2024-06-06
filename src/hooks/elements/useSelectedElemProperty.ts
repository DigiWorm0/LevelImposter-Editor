import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import LIProperties, { LIPropName } from "../../types/li/LIProperties";
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
export default function useSelectedElemProp<T extends LIPropName>(propName: T) {
    return useAtom(selectedElementPropAtom(propName)) as [LIProperties[T] | undefined, (newValue: LIProperties[T]) => void];
}

export function useSetSelectedElemProp<T extends LIPropName>(propName: T) {
    return useSetAtom(selectedElementPropAtom(propName)) as (newValue: LIProperties[T]) => void;
}

export function useSelectedElemPropValue<T extends LIPropName>(propName: T) {
    return useAtomValue(selectedElementPropAtom(propName)) as LIProperties[T] | undefined;
}