// Cached image canvas
import {Jimp} from "jimp";
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

    // Re-encode Image to PNG
    // HACK: Fixes issue with Jimp throwing an error with invalid image data
    canvas.width = image.width;
    canvas.height = image.height;
    if (!ctx)
        throw new Error("Failed to get canvas context");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const bitmap = ctx.getImageData(0, 0, image.width, image.height).data;

    // Import into Jimp
    const jimpImage = await Jimp.fromBitmap({
        data: bitmap,
        width: image.width,
        height: image.height
    });

    // Round dimensions to nearest multiple of 4
    const width = Math.floor(jimpImage.width / 4) * 4;
    const height = Math.floor(jimpImage.height / 4) * 4;
    jimpImage.crop({w: width, h: height, x: 0, y: 0});

    // Flip vertically (fixes Unity's interpretation of DXT1 textures)
    jimpImage.flip({vertical: true, horizontal: false});

    // Check if image has semi-transparency
    // If it does, we will use DXT5 instead of DXT1
    const hasSemiTransparency = jimpImage.bitmap.data.some((value: number, index: number) => {
        // Check alpha channel (4th byte in RGBA)
        return index % 4 === 3 && value < 255 && value > 0;
    });
    const format = hasSemiTransparency ? "DXT5" : "DXT1";

    // Convert Image to DDS (DXT1)
    const newHeader = createDDSHeader(width, height, format);
    const headerData = writeDDSHeader(newHeader);
    const textureData = format === "DXT5" ?
        writeDXT5Texture(newHeader, jimpImage.bitmap.data) :
        writeDXT1Texture(newHeader, jimpImage.bitmap.data);
    const buffer = Buffer.concat([headerData, textureData]);

    // Convert Buffer to Blob
    const blob = new Blob([buffer], {type: "image/vnd.ms-dds"});
    if (!blob)
        throw new Error("Error converting buffer to blob");

    return blob;
}