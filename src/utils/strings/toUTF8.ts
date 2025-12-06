/**
 * Fixes Unicode characters in JSON
 * @see https://stackoverflow.com/questions/12271547/shouldnt-json-stringify-escape-unicode-characters
 * @param s - The string to convert
 * @returns The converted string
 */
export function toUTF8(s: string) {
    return s.replace(/[^\x20-\x7F]/g, x => "\\u" + ("000" + x.codePointAt(0)?.toString(16)).slice(-4));
}