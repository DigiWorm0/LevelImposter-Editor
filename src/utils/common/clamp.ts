/**
 * Clamps a number between a min and max value
 * @param num - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns number The clamped number
 */
export default function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}