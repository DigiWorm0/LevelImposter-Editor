/**
 * Linear interpolation between two numbers.
 * @param a - The starting number.
 * @param b - The ending number.
 * @param t - The interpolation factor, typically between 0 and 1.
 * @returns The interpolated value between `a` and `b`.
 */
export default function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}