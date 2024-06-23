import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { MaybeGUID } from "../../../types/generic/GUID";
import { keyframeAtomFamily } from "./useKeyframe";
import LIAnimKeyframe from "../../../types/li/LIAnimKeyframe";

// Atoms
export const selectedKeyframeIDAtom = atom<MaybeGUID>(undefined);
export const selectedKeyframeAtom = atom(
    (get) => {
        const selectedKeyframeID = get(selectedKeyframeIDAtom);
        return get(keyframeAtomFamily(selectedKeyframeID));
    },
    (get, set, keyframe: LIAnimKeyframe) => {
        const selectedKeyframeID = get(selectedKeyframeIDAtom);
        set(keyframeAtomFamily(selectedKeyframeID), keyframe);
    }
);
export const isSelectedKeyframeAtom = atom(
    (get) => {
        return get(selectedKeyframeIDAtom) != undefined;
    }
);

// Hooks
export function useSelectedKeyframeID() {
    return useAtom(selectedKeyframeIDAtom);
}

export function useSetSelectedKeyframeID() {
    return useSetAtom(selectedKeyframeIDAtom);
}

export function useSelectedKeyframeIDValue() {
    return useAtomValue(selectedKeyframeIDAtom);
}

export default function useSelectedKeyframe() {
    return useAtom(selectedKeyframeAtom);
}

export function useSetSelectedKeyframe() {
    return useSetAtom(selectedKeyframeAtom);
}

export function useSelectedKeyframeValue() {
    return useAtomValue(selectedKeyframeAtom);
}

export function useIsSelectedKeyframe() {
    return useAtomValue(isSelectedKeyframeAtom);
}