import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isSelectedColliderAtom, selectedColliderAtom, selectedColliderIDAtom } from "./Jotai";

export function useSelectedColliderID() {
    return useAtom(selectedColliderIDAtom);
}

export function useSetSelectedColliderID() {
    return useSetAtom(selectedColliderIDAtom);
}

export function useSelectedColliderIDValue() {
    return useAtomValue(selectedColliderIDAtom);
}

export default function useSelectedCollider() {
    return useAtom(selectedColliderAtom);
}

export function useSetSelectedCollider() {
    return useSetAtom(selectedColliderAtom);
}

export function useSelectedColliderValue() {
    return useAtomValue(selectedColliderAtom);
}

export function useIsSelectedCollider() {
    return useAtomValue(isSelectedColliderAtom);
}