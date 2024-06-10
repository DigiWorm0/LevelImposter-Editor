/**
 * Compares two arrays and returns true if they have equal children, false otherwise.
 * @param a - The first array to compare.
 * @param b - The second array to compare.
 */
export default function compareArrays<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}