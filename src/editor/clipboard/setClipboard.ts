import store from "../../shared/store";
import {localClipboardAtom} from "./clipboardStore";
import ClipboardContent, {ClipboardContentType} from "./ClipboardContent";

export default function setClipboard(content: ClipboardContent) {
    // Serialize the clipboard object
    const clipboardJSON = JSON.stringify(content);

    // Write to local clipboard
    store.set(localClipboardAtom, clipboardJSON);

    // Check if secure context
    if (!window.isSecureContext) {
        console.warn("Cannot access clipboard in insecure context");
        return;
    }

    // Check if navigator clipboard is available
    if (!navigator.clipboard.write) {
        console.warn("Navigator clipboard is not available");
        return;
    }

    // Copy to clipboard
    const blob = new Blob([clipboardJSON], {type: ClipboardContentType});
    const clipboardItem = new ClipboardItem({[ClipboardContentType]: blob});
    navigator.clipboard.write([clipboardItem]).catch(console.error);

}