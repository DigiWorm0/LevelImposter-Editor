import BitmapData from "../../types/texture/BitmapData";

/**
 * Converts a CanvasRenderingContext2D to BitmapData.
 * @param ctx - The canvas rendering context to convert
 * @returns The BitmapData containing the bitmap array and its dimensions
 */
export default function canvasToBitmap(ctx: CanvasRenderingContext2D): BitmapData {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    return {
        bitmap: imageData.data,
        width: ctx.canvas.width,
        height: ctx.canvas.height
    };
}