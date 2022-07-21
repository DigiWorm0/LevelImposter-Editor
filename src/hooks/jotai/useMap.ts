import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { elementIDsAtom, mapAtom, mapNameAtom } from "./Jotai";


export default function useMap() {
    return useAtom(mapAtom);
}

export function useSetMap() {
    return useSetAtom(mapAtom);
}

export function useMapValue() {
    return useAtomValue(mapAtom);
}

export function useMapName() {
    return useAtom(mapNameAtom);
}

export function useMapReset() {
    return useResetAtom(mapAtom);
}

export function useElementIDs() {
    return useAtomValue(elementIDsAtom);
}