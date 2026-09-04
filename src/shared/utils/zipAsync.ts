import {AsyncZippable, zip} from "fflate";

/**
 * Zips the provided data asynchronously.
 * Returns a Promise that resolves with the zipped data as a Uint8Array.
 * @param data - The data to be zipped, which can be an object containing files and folders.
 * @returns A Promise that resolves with the zipped data as a Uint8Array.
 */
export const zipAsync = (data: AsyncZippable) => {
    return new Promise<Uint8Array>((resolve, reject) => {
        zip(data, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};