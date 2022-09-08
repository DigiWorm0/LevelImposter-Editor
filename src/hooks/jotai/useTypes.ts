import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import LIElement from "../../types/li/LIElement";
import { elementsAtom } from "./useMap";

// Atom
export const elementTypeAtom = atomFamily((type: string) => {
    const typeAtom = atom(
        (get) => {
            const elements = get(elementsAtom);
            return elements.filter((elem) => elem.type === type);
        },
        (get, set, elem: LIElement[]) => {
            const elements = get(elementsAtom);
            const newElements = elements.filter((elem) => elem.type !== type);
            set(elementsAtom, [...newElements, ...elem]);
        }
    );
    typeAtom.debugLabel = `typeAtom(${type})`;
    return typeAtom;
}, (a, b) => a === b);

// Hook
export function useElementType(type: string) {
    return useAtomValue(elementTypeAtom(type));
}