import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { elementsAtom } from "../map/useMap";
import LIElement from "../../types/li/LIElement";
import compareArrays from "../../utils/compareArrays";

// Atom
export const elementTypeAtom = atomFamily((typeFilter: string) => {
    let prevElements: LIElement[] = [];
    const typeAtom = atom(
        (get) => {
            const elements = get(elementsAtom);
            const filteredElements = elements.filter((elem) => elem.type.includes(typeFilter));

            // Only update if the array has changed
            if (!compareArrays(filteredElements, prevElements))
                prevElements = filteredElements;

            return prevElements;
        }
    );
    typeAtom.debugLabel = `typeAtom(${typeFilter})`;
    return typeAtom;
}, (a, b) => a === b);

// Hook
export function useElementsOfType(type: string) {
    return useAtomValue(elementTypeAtom(type));
}