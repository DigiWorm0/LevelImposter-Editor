/**
 * Convert bytes to a human-readable size string (ex: KB, MB, GB).
 * @param bytes - The size in bytes.
 * @param precision - The number of decimal places to include. Default is 2.
 * @returns The size as a human-readable string.
 */
export default function toSizeString(bytes: number, precision = 2): string {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(precision) + " " + sizes[i];
}