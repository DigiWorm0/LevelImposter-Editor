/**
 * Convert bytes to a human-readable size string (ex: KB, MB, GB).
 * @param bytes - The size in bytes.
 * @param precision - The number of decimal places to include. Default is 2.
 * @returns The size as a human-readable string.
 */
export default function dataSizeToString(bytes: number, precision = 2): string {
    const sizes = ["bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 bytes";  // <-- Avoid div by zero
    if (bytes === 1) return "1 byte";   // <-- Avoid pluralization
    const sizeIndex = Math.min(
        Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes.length
    );
    return (bytes / Math.pow(1024, sizeIndex)).toFixed(precision) + " " + sizes[sizeIndex];
}