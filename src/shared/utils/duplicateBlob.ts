/**
 * Duplicates the data contents of a blob
 * into a separate, unique blob.
 * @param blob - The original blob to read
 * @returns A new blob w/ the same contents as the original blob
 */
export default function duplicateBlob(blob: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                resolve(new Blob([reader.result as ArrayBuffer], {type: blob.type}));
            } else {
                reject("No file selected");
            }
        };
        reader.readAsArrayBuffer(blob);
    });
}