import getClipboard from "@editor/clipboard/getClipboard";
import ClipboardContent from "@editor/clipboard/ClipboardContent";
import executeCommand, {EditorCommand} from "@editor/history/executeCommand";
import {addKeyframe} from "@editor/animators/commands/addKeyframe";

export const pasteKeyframesFromClipboard = async () => {
    // Get the clipboard data
    const clipboardData = await getClipboard();
    if (!clipboardData)
        return;

    return executeCommand(pasteKeyframesFromClipboardContent(clipboardData));
};

const pasteKeyframesFromClipboardContent = (
    clipboardContent: ClipboardContent
): EditorCommand => map => {

    // Get Keyframes
    const keyframes = clipboardContent.keyframe;
    if (!keyframes)
        return;
    if (keyframes.length === 0)
        return;

    // Add each keyframe
    for (const keyframe of keyframes)
        addKeyframe(
            keyframe.targetID,
            keyframe.property,
            keyframe.value
        )(map);
};