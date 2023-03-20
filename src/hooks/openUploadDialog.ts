/**
 * Opens the file upload dialog and returns the file data as a base64 string
 * @param fileTypes - Input accept types (e.g. "image/*")
 * @param callback - Callback function to run when file is uploaded
 * @returns Base64 string of the uploaded file
 */
export default function openUploadDialog(fileTypes: string): Promise<string> {
    return new Promise((resolve, reject) => {
        console.log("Showing Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = fileTypes;
        input.onchange = () => {
            console.log("Uploaded File");
            if (input.files === null) {
                reject();
                return;
            }
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Loaded File");
                if (reader.result === null) {
                    reject();
                    return;
                }
                resolve(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
        input.click();
    });
}