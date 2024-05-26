import { atomFamily } from "jotai/utils";
import { atom, useAtomValue } from "jotai";
import { elementsAtom } from "../map/useMap";

export const elementTypeCountAtom = atomFamily((typeFilter: string) => {
    return atom((get) => {
        const elements = get(elementsAtom);
        return elements.filter((elem) => elem.type.includes(typeFilter)).length;
    });
});

export default function useElementTypeCount(type: string) {
    return useAtomValue(elementTypeCountAtom(type));
}