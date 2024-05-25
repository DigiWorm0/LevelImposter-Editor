import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { elementsAtom } from "../map/useMap";

// Atom
export const elementTypeAtom = atomFamily((typeFilter: string) => {
    const typeAtom = atom(
        (get) => {
            const elements = get(elementsAtom);
            return elements.filter((elem) => elem.type.includes(typeFilter));
        }
    );
    typeAtom.debugLabel = `typeAtom(${typeFilter})`;
    return typeAtom;
}, (a, b) => a === b);

// Hook
export function useElementType(type: string) {
    return useAtomValue(elementTypeAtom(type));
}