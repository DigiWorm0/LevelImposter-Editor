// Cached image canvas
import createDDSHeader from "./write/createDDSHeader";
import writeDDSHeader from "./write/writeDDSHeader";
import writeDXT5Texture from "./write/writeDXT5Texture";
import writeDXT1Texture from "./write/writeDXT1Texture";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

/**
 * Converts an HTMLImageElement to a DDS Blob using DXT1 or DXT5 compression.
 * @param image - The image to convert
 */
export default async function convertImageToDDS(image: HTMLImageElement): Promise<Blob> {

    // Round dimensions to nearest multiple of 4
    const width = Math.floor(image.width / 4) * 4;
    const height = Math.floor(image.height / 4) * 4;

    // Create canvas and draw image
    canvas.width = width;
    canvas.height = height;
    if (!ctx)
        throw new Error("Failed to get canvas context");

    // Flip vertically (fixes Unity's interpretation of DXT1 textures)
    ctx.clearRect(0, 0, width, height);
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.drawImage(image, 0, 0, width, height);

    // Get image bitmap data
    const imageData = ctx.getImageData(0, 0, width, height);
    const bitmap = imageData.data;

    // Check if image has semi-transparency
    // If it does, we will use DXT5 instead of DXT1
    const hasSemiTransparency = bitmap.some((value: number, index: number) => {
        // Check alpha channel (4th byte in RGBA)
        return index % 4 === 3 && value < 255 && value > 0;
    });
    const format = hasSemiTransparency ? "DXT5" : "DXT1";

    // Convert Image to DDS (DXT1)
    const newHeader = createDDSHeader(width, height, format);
    const headerData = writeDDSHeader(newHeader);
    const textureData = format === "DXT5" ?
        writeDXT5Texture(newHeader, bitmap) :
        writeDXT1Texture(newHeader, bitmap);
    const buffer = Buffer.concat([headerData, textureData]);

    // Convert Buffer to Blob
    const blob = new Blob([buffer], {type: "image/vnd.ms-dds"});
    if (!blob)
        throw new Error("Error converting buffer to blob");

    return blob;
}