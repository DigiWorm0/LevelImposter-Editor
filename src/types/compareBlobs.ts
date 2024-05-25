/**
 * Compare two blobs. Return true if they contain the same data.
 * @param a - The first blob to compare.
 * @param b - The second blob to compare.
 */
export default function compareBlobs(a: Blob, b: Blob) {
    return new Promise<boolean>((resolve) => {
        const readerA = new FileReader();
        const readerB = new FileReader();

        readerA.onload = () => {
            readerB.onload = () => {
                resolve(readerA.result === readerB.result);
            };

            readerB.readAsDataURL(b);
        };

        readerA.readAsDataURL(a);
    });
}