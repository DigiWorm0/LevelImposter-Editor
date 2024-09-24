/**
 * Saves a file to the user's computer from a URL.
 * @param url - The URL of the file to save.
 * @param filename - The name of the file to save, including the extension.
 */
export default function saveFileFromURL(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
}

/**
 * Saves a file to the user's computer from a Blob.
 * @param blob - The Blob to save.
 * @param filename - The name of the file to save, including the extension.
 */
export function saveFileFromBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    saveFileFromURL(url, filename);
    URL.revokeObjectURL(url);
}