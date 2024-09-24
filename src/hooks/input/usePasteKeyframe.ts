import {useSetAtom} from "jotai";
import {atom} from "jotai/index";
import {clipboardAtom} from "./useClipboard";
import {addKeyframeAtom} from "../timeline/useAddKeyframe";

const pasteKeyframeAtom = atom(null, async (get, set) => {
    // Get the clipboard data
    const clipboardData = await get(clipboardAtom);
    if (!clipboardData)
        return;

    // Get Keyframes
    const keyframes = clipboardData.keyframe;
    if (!keyframes)
        return;
    if (keyframes.length === 0)
        return;

    // Add each keyframe
    keyframes.forEach(keyframe => {
        set(addKeyframeAtom, {
            targetID: keyframe.targetID,
            property: keyframe.property,
            value: keyframe.keyframe.value
        });
    });
});

export default function usePasteKeyframe() {
    return useSetAtom(pasteKeyframeAtom);
}