import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../../types/generic/GUID";
import { selectedElementAtom } from "../useSelectedElem";
import LIAnimKeyframe, { DEFAULT_KEYFRAMES } from "../../../types/li/LIAnimKeyframe";

export const keyframeAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const selectedElem = get(selectedElementAtom);
        const keyframes = selectedElem?.properties.animKeyframes ?? DEFAULT_KEYFRAMES;
        return keyframes?.find(c => c.id === id);
    }, (get, set, keyframe: LIAnimKeyframe) => {
        const selectedElem = get(selectedElementAtom);
        if (!selectedElem)
            return;

        const _animKeyframes = selectedElem.properties.animKeyframes ?? DEFAULT_KEYFRAMES;
        const animKeyframes = [..._animKeyframes];
        const index = animKeyframes.findIndex(c => c.id === id);
        if (index === -1)
            return;

        // Update the keyframe
        animKeyframes[index] = keyframe;

        // Update the selected element
        set(selectedElementAtom, {
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                animKeyframes
            }
        });
    });
});

export default function useKeyframe(id: MaybeGUID) {
    return useAtom(keyframeAtomFamily(id));
}

export function useSetKeyframe(id: MaybeGUID) {
    return useSetAtom(keyframeAtomFamily(id));
}

export function useKeyframeValue(id: MaybeGUID) {
    return useAtomValue(keyframeAtomFamily(id));
}