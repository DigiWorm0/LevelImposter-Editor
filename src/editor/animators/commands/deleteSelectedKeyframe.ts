import {EditorCommand} from "@editor/history/executeCommand";
import {getAnimTarget} from "@editor/document/elements/getAnimTarget";
import store from "@/shared/store";
import {selectedKeyframeAtom} from "@editor/selection/stores/keyframeSelectionStore";

export const deleteSelectedKeyframe = (): EditorCommand => map => {
    const selectedKeyframe = store.get(selectedKeyframeAtom);
    if (!selectedKeyframe)
        throw new Error("No keyframe selected");

    const animTarget = getAnimTarget(map, selectedKeyframe.targetID);
    if (!animTarget)
        throw new Error("Target not found");

    const property = animTarget.properties[selectedKeyframe.property];
    if (!property)
        throw new Error("Property not found");

    const index = property.keyframes.findIndex(kf => kf.id === selectedKeyframe.keyframeID);
    if (index === -1)
        throw new Error("Keyframe not found");

    property.keyframes.splice(index, 1);
};