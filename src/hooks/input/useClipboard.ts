import { atom } from "jotai";
import LIClipboard from "../../types/li/LIClipboard";

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
        clipboardData = await navigator.clipboard.readText();

        // Check if clipboard has data
        if (!clipboardData) {
            console.error("Clipboard is empty");
            return;
        }
    }

    // Parse clipboard data
    return JSON.parse(clipboardData) as LIClipboard | undefined;
});

localClipboardAtom.debugLabel = "localClipboardAtom";
clipboardAtom.debugLabel = "clipboardAtom";