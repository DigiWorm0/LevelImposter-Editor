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