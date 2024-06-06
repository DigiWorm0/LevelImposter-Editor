/**
 * Compare two blobs. Return true if they contain the same data.
 * @param a - The first blob to compare.
 * @param b - The second blob to compare.
 */
export default async function compareBlobs(a: Blob, b: Blob) {

    // Compare Size
    if (a.size !== b.size)
        return false;

    // Get Data
    const dataA = await a.arrayBuffer();
    const dataB = await b.arrayBuffer();

    // Convert to Uint8Array for byte by byte comparison
    const viewA = new Uint8Array(dataA);
    const viewB = new Uint8Array(dataB);

    // Compare Byte by Byte
    return compareUInt8Arrays(viewA, viewB);
}

export function compareUInt8Arrays(a: Uint8Array, b: Uint8Array) {
    if (a.length !== b.length)
        return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }

    return true;
}