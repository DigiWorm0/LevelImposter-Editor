import store from "../../shared/store";
import {localClipboardAtom} from "../state/clipboardStore";
import ClipboardContent, {ClipboardContentType} from "./ClipboardContent";

export default async function getClipboard() {
    // TODO: Prioritize clipboard API over local clipboard

    // Get Local Clipboard
    let clipboardData = store.get(localClipboardAtom);

    // If no local clipboard, read from navigator
    if (!clipboardData) {
        // Check if secure context
        if (!window.isSecureContext) {
            console.warn("Cannot access clipboard in insecure context");
            return;
        }

        // Check if navigator clipboard is available
        if (!navigator.clipboard.read) {
            console.warn("Navigator clipboard is not available");
            return;
        }

        // Read clipboard
        const clipboardItems = await navigator.clipboard.read();
        if (!clipboardItems || clipboardItems.length === 0) {
            console.warn("Clipboard is empty");
            return;
        }

        // Get the first item
        const clipboardItem = clipboardItems[0];
        if (!clipboardItem.types.includes(ClipboardContentType)) {
            console.warn("Clipboard does not contain JSON data");
            return;
        }

        // Read clipboard data
        const clipboardBlob = await clipboardItem.getType(ClipboardContentType);
        if (!clipboardBlob) {
            console.warn("Failed to read clipboard data");
            return;
        }

        // Read clipboard data as text
        clipboardData = await clipboardBlob.text();
    }

    // Parse clipboard data
    return JSON.parse(clipboardData) as ClipboardContent | undefined;
}