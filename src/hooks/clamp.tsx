

/**
 * Clamps a number between a minimum and maximum value.
 */
export default function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}