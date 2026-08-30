import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";

import {documentAtom} from "@editor/document/documentStore";

export const elementTypeCountAtomFamily = atomFamily((typeFilter: string) => atom((get) => {
    const currentDocument = get(documentAtom);
    const allElements = Object.values(currentDocument.elements); // TODO: Refactor this out
    return allElements.filter((elem) => elem.type.includes(typeFilter)).length;
}));

export default function useElementTypeCount(type: string) {
    return useAtomValue(elementTypeCountAtomFamily(type));
}