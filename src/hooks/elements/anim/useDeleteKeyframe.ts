import { atom, useSetAtom } from "jotai";
import { MaybeGUID } from "../../../types/generic/GUID";
import { selectedElementPropAtom } from "../useSelectedElemProperty";
import { selectedKeyframeIDAtom } from "./useSelectedKeyframe";
import LIAnimKeyframe from "../../../types/li/LIAnimKeyframe";

export const deleteKeyframeAtom = atom(null, (get, set, keyframeID: MaybeGUID) => {
    if (!keyframeID)
        return;

    // Get the keyframes
    const keyframesAtom = selectedElementPropAtom("animKeyframes");
    const keyframes = get(keyframesAtom) as LIAnimKeyframe[];
    if (!keyframes)
        return;

    // Remove the keyframes
    const filteredKeyframes = keyframes.filter(c => c.id !== keyframeID);
    set(keyframesAtom, filteredKeyframes);

    // Unselect the keyframes
    set(selectedKeyframeIDAtom, undefined);
});

export default function useDeleteKeyframe() {
    return useSetAtom(deleteKeyframeAtom);
}