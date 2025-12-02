/**
 * Opens the file upload dialog and returns the file data as a base64 string
 * @param fileTypes - MIME types to accept (e.g. "image/*")
 * @returns MapAsset of the uploaded file and a random identifier
 */
export default function openUploadDialog(fileTypes: string): Promise<File> {
    return new Promise((resolve, reject) => {
        console.log("Showing Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = fileTypes;
        input.onchange = () => {
            const file = input.files?.item(0);
            if (file) {
                resolve(file);
            } else {
                reject("No file selected");
            }
        };
        input.click();
    });
}

/**
 * Opens the file upload dialog allowing multiple file selection
 * @param fileTypes - MIME types to accept (e.g. "image/*")
 * @returns Array of uploaded Files
 */
export function openMultipleUploadDialog(fileTypes: string): Promise<FileList> {
    return new Promise((resolve, reject) => {
        console.log("Showing Multiple Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = fileTypes;
        input.multiple = true;
        input.onchange = () => {
            const files = input.files;
            if (files && files.length > 0) {
                resolve(files);
            } else {
                reject("No files selected");
            }
        };
        input.click();
    });
}