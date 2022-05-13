import GUID from "../types/GUID";

/**
 * Generates a random GUID
 * @returns a random GUID
 */
export default function generateGUID(): GUID {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }) as GUID;
}