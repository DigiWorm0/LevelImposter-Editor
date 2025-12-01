/**
 * Interface representing bitmap data for textures.
 * Includes the bitmap array and its dimensions.
 */
export default interface BitmapData {
    bitmap: Uint8ClampedArray;
    width: number;
    height: number;
}