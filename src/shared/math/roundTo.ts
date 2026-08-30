/**
 * Rounds a number to the nearest specified precision.
 * @param value - The number to round.
 * @param precision - The precision to round to, default is 0.1.
 * @return The rounded number.
 */
export default function roundTo(value: number, precision: number = 0.1): number {
    return Math.round(value / precision) * precision;
}