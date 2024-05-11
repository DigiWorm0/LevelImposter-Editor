export default function duplicateBlob(blob: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                resolve(new Blob([reader.result as ArrayBuffer], { type: blob.type }));
            } else {
                reject("No file selected");
            }
        }
        reader.readAsArrayBuffer(blob);
    });
}