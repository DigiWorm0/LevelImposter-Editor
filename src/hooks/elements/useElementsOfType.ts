import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import compareArrays from "../../utils/common/compareArrays";

import {allElementsAtom} from "@editor/document/documentStore";
import {MapElement} from "@editor/document/types/MapDocument";

// Atom
export const elementTypeAtom = atomFamily((typeFilter: string) => {
    let prevElements: MapElement[] = [];
    const typeAtom = atom(
        (get) => {
            const elements = get(allElementsAtom);
            const filteredElements = elements.filter((elem) => elem.type?.includes(typeFilter));

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