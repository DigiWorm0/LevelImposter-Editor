import {MaybeGUID} from "@shared/types/GUID";
import {useAtomValue} from "jotai";
import {docElementsAtom} from "@editor/document/documentStore";
import cachedAtomFamily from "@shared/atomics/cachedAtomFamily";

export const elementAtomFamily = cachedAtomFamily((id: MaybeGUID, get) => {
    if (id === undefined)
        return undefined;
    return get(docElementsAtom)[id];
});

export const useElement = (id: MaybeGUID) => useAtomValue(elementAtomFamily(id));