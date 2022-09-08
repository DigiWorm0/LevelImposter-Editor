import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import { MaybeLIElement } from "../../types/li/LIElement";
import { elementFamilyAtom } from "./useElements";
import { elementsAtom } from "./useMap";
import { selectedColliderIDAtom } from "./useSelectedCollider";

// Atoms
export const selectedElementIDAtom = atom<MaybeGUID>(undefined);
export const isSelectedElemFamily = atomFamily((id: MaybeGUID) => atom((get) => get(selectedElementIDAtom) === id));
export const selectedElementAtom = atom(
    (get) => {
        const id = get(selectedElementIDAtom);
        const elemAtom = elementFamilyAtom(id);
        const elem = get(elemAtom);
        return elem;
    },
    (get, set, elem: MaybeLIElement) => {
        const elements = get(elementsAtom);
        const index = elements.findIndex((e) => e.id === elem?.id);
        if (index >= 0 && elem) {
            elements[index] = { ...elem };
            set(elementsAtom, [...elements]);
        }
    }
);
export const removeElementAtom = atom(null, (get, set, id: MaybeGUID) => {
    elementFamilyAtom.remove(id);
    set(selectedElementAtom, undefined);
    set(selectedColliderIDAtom, undefined);
    set(elementsAtom, get(elementsAtom).filter((elem) => elem.id !== id));
});

// Debug
selectedElementIDAtom.debugLabel = "selectedElementIDAtom";
selectedElementAtom.debugLabel = "selectedElementAtom";
removeElementAtom.debugLabel = "removeElementAtom";

// Hooks
export function useSelectedElemID() {
    return useAtom(selectedElementIDAtom);
}
export function useSetSelectedElemID() {
    return useSetAtom(selectedElementIDAtom);
}
export function useSelectedElemIDValue() {
    return useAtomValue(selectedElementIDAtom);
}

export default function useSelectedElem() {
    return useAtom(selectedElementAtom);
}
export function useSetSelectedElem() {
    return useSetAtom(selectedElementAtom);
}
export function useSelectedElemValue() {
    return useAtomValue(selectedElementAtom);
}
export function useIsSelectedElem(id: MaybeGUID) {
    return useAtomValue(isSelectedElemFamily(id));
}

export function useRemoveElement() {
    return useSetAtom(removeElementAtom);
}