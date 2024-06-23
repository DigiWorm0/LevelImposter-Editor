export default function floatMod(a: number, b: number): number {
    return a - b * Math.floor(a / b);
}