import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {allElementsAtom} from "../../editor/state/documentStore";

export const elementTypeCountAtom = atomFamily((typeFilter: string) => {
    return atom((get) => {
        const elements = get(allElementsAtom);
        return elements.filter((elem) => elem.type.includes(typeFilter)).length;
    });
});

export default function useElementTypeCount(type: string) {
    return useAtomValue(elementTypeCountAtom(type));
}