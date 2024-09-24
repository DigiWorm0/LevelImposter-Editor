// Linear interpolation between two values
export default function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

// Ease-in-out lerp
export function lerpSmooth(a: number, b: number, t: number): number {
    return lerp(a, b, t * t * (3.0 - 2.0 * t));
}

// Ease-in lerp
export function lerpIn(a: number, b: number, t: number): number {
    return lerp(a, b, t * t);
}

// Ease-out lerp
export function lerpOut(a: number, b: number, t: number): number {
    return lerp(a, b, 1 - (1 - t) * (1 - t));
}