import {atom} from "jotai";
import LIClipboard from "../../types/li/LIClipboard";

const CLIPBOARD_TYPE = "text/plain";

export const localClipboardAtom = atom<string | undefined>(undefined);
export const clipboardAtom = atom(async (get) => {
    // Get Local Clipboard
    let clipboardData = get(localClipboardAtom);

    // If no local clipboard, read from navigator
    if (!clipboardData) {
        // Check if secure context
        if (!window.isSecureContext) {
            console.error("Cannot access clipboard in insecure context");
            return;
        }

        // Check if navigator clipboard is available
        if (!navigator.clipboard.read) {
            console.error("Navigator clipboard is not available");
            return;
        }

        // Read clipboard
        const clipboardItems = await navigator.clipboard.read();
        if (!clipboardItems || clipboardItems.length === 0) {
            console.error("Clipboard is empty");
            return;
        }

        // Get the first item
        const clipboardItem = clipboardItems[0];
        if (!clipboardItem.types.includes(CLIPBOARD_TYPE)) {
            console.error("Clipboard does not contain JSON data");
            return;
        }

        // Read clipboard data
        const clipboardBlob = await clipboardItem.getType(CLIPBOARD_TYPE);
        if (!clipboardBlob) {
            console.error("Failed to read clipboard data");
            return;
        }

        // Read clipboard data as text
        clipboardData = await clipboardBlob.text();
    }

    // Parse clipboard data
    return JSON.parse(clipboardData) as LIClipboard | undefined;
}, (_, set, newValue: LIClipboard) => {
    // Serialize the clipboard object
    const clipboardJSON = JSON.stringify(newValue);

    // Write to local clipboard
    set(localClipboardAtom, clipboardJSON);

    // Check if secure context
    if (!window.isSecureContext) {
        console.error("Cannot access clipboard in insecure context");
        return;
    }

    // Check if navigator clipboard is available
    if (!navigator.clipboard.write) {
        console.error("Navigator clipboard is not available");
        return;
    }

    // Copy to clipboard
    const blob = new Blob([clipboardJSON], {type: CLIPBOARD_TYPE});
    const clipboardItem = new ClipboardItem({[CLIPBOARD_TYPE]: blob});
    navigator.clipboard.write([clipboardItem]).catch(console.error);
});

localClipboardAtom.debugLabel = "localClipboardAtom";
clipboardAtom.debugLabel = "clipboardAtom";