export default function getFileExtension(fileType: string): string {
    return fileType.split("/")[1];
}