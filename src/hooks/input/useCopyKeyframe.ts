import {useSetAtom} from "jotai";
import {atom} from "jotai/index";
import LIClipboard from "../../types/li/LIClipboard";
import {clipboardAtom} from "./useClipboard";
import {selectedKeyframeAtom} from "../timeline/useSelectedKeyframe";
import {selectedElementPropAtom} from "../elements/useSelectedElemProperty";
import LIAnimTarget from "../../types/li/LIAnimTarget";

const copyKeyframeAtom = atom(null, (get, set) => {

    // Get anim targets
    const animTargets = get(selectedElementPropAtom("animTargets")) as LIAnimTarget[];
    if (!animTargets)
        return;

    // Get the selected keyframe info
    const selectedKeyframeInfo = get(selectedKeyframeAtom);
    if (!selectedKeyframeInfo)
        return;
    const {targetID, property, keyframeID} = selectedKeyframeInfo;

    // Find the selected keyframe
    const animTarget = animTargets.find(t => t.id === targetID);
    const keyframes = animTarget?.properties[property].keyframes;
    const selectedKeyframe = keyframes?.find(k => k.id === keyframeID);
    if (!selectedKeyframe)
        return;

    // Create a clipboard object
    const clipboardData: LIClipboard = {
        keyframe: [{
            targetID: targetID,
            property: property,
            keyframe: selectedKeyframe
        }]
    };

    // Set the clipboard
    set(clipboardAtom, clipboardData);
});

export default function useCopyKeyframe() {
    return useSetAtom(copyKeyframeAtom);
}