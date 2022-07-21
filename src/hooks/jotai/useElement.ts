import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { addElementAtom, elementFamilyAtom, removeElementAtom } from "./Jotai";

export default function useElement(id: MaybeGUID) {
    return useAtom(elementFamilyAtom(id));
}

export function useSetElement(id: MaybeGUID) {
    return useSetAtom(elementFamilyAtom(id));
}

export function useElementValue(id: MaybeGUID) {
    return useAtomValue(elementFamilyAtom(id));
}

export function useAddElement() {
    return useSetAtom(addElementAtom);
}

export function useRemoveElement() {
    return useSetAtom(removeElementAtom);
}