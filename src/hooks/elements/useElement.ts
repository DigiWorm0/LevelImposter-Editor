import {MaybeGUID} from "@/shared/types/GUID";
import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {docElementsAtom} from "@editor/document/documentStore";

export const elementAtomFamily = atomFamily((id: MaybeGUID) => atom((get) => {
    if (id === undefined)
        return undefined;
    return get(docElementsAtom)[id];
}));

export const useElement = (id: MaybeGUID) => useAtomValue(elementAtomFamily(id));