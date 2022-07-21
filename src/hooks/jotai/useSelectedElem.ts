import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { isSelectedElemFamily, selectedElemAtom, selectedElemIDAtom } from "./Jotai";

export function useSelectedElemID() {
    return useAtom(selectedElemIDAtom);
}

export function useSetSelectedElemID() {
    return useSetAtom(selectedElemIDAtom);
}

export function useSelectedElemIDValue() {
    return useAtomValue(selectedElemIDAtom);
}

export default function useSelectedElem() {
    return useAtom(selectedElemAtom);
}

export function useSetSelectedElem() {
    return useSetAtom(selectedElemAtom);
}

export function useSelectedElemValue() {
    return useAtomValue(selectedElemAtom);
}

export function useIsSelectedElem(id: MaybeGUID) {
    return useAtomValue(isSelectedElemFamily(id));
}