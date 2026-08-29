import LIClipboard from "@/types/li/LIClipboard";
import store from "@/shared/store";
import {selectedElementPropAtom} from "@/hooks/elements/useSelectedElemProperty";
import LIAnimTarget from "@/types/li/LIAnimTarget";
import setClipboard from "@editor/clipboard/setClipboard";
import {selectedKeyframeAtom} from "@editor/state/selection/keyframeSelectionStore";

export const copyKeyframesToClipboard = () => {
    // Get anim targets
    const animTargets = store.get(selectedElementPropAtom("animTargets")) as LIAnimTarget[];
    if (!animTargets)
        return;

    // Get the selected keyframe info
    const selectedKeyframeInfo = store.get(selectedKeyframeAtom);
    if (!selectedKeyframeInfo)
        return;
    const {targetID, property, keyframeID} = selectedKeyframeInfo;

    // Find the selected keyframe
    const animTarget = animTargets.find(t => t.id === targetID);
    const keyframes = animTarget?.properties[property]?.keyframes;
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
    setClipboard(clipboardData);
};