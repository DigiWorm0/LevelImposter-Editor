/**
 * Downloads a file from a URL and returns the ArrayBuffer
 * @param url - The URL to download from
 * @param onProgress - A callback for progress updates. Percent is passed as a number between 0 and 1
 * @returns Promise<ArrayBuffer> A promise that resolves to the downloaded ArrayBuffer
 */
export default function downloadFromURL(url: string, onProgress?: (percent: number) => void): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {

        // Create Request
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";

        // On Progress
        if (onProgress) {
            xhr.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percent = e.loaded / e.total;
                    onProgress(percent);
                }
            }
        }

        // On Load
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (xhr.responseType === "arraybuffer")
                    resolve(xhr.response);
                else
                    reject(new Error("Failed to download file: Invalid response type"));
            } else {
                reject(new Error(`Failed to download file: ${xhr.statusText}`));
            }
        }

        // On Error
        xhr.onerror = () => {
            reject(new Error("Failed to download file"));
        }

        // Send Request
        xhr.send();
    });
}