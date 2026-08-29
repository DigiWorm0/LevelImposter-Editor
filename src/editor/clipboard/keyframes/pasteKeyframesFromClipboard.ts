import getClipboard from "@editor/clipboard/getClipboard";
import ClipboardContent from "@editor/clipboard/ClipboardContent";
import executeCommand, {MapCommand} from "@editor/history/executeCommand";

export const pasteKeyframesFromClipboard = async () => {
    // Get the clipboard data
    const clipboardData = await getClipboard();
    if (!clipboardData)
        return;

    return executeCommand(pasteKeyframesFromClipboardContent(clipboardData));
};

const pasteKeyframesFromClipboardContent = (
    clipboardContent: ClipboardContent
): MapCommand => map => {

    // Get Keyframes
    const keyframes = clipboardContent.keyframe;
    if (!keyframes)
        return;
    if (keyframes.length === 0)
        return;

    // Add each keyframe
    for (const keyframe of keyframes) {

    }
    // keyframes.forEach(keyframe => {
    //     set(addKeyframeAtom, {
    //         targetID: keyframe.targetID,
    //         property: keyframe.property,
    //         value: keyframe.keyframe.value
    //     });
    // });
}