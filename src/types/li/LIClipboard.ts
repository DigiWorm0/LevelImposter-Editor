import LIElement from "./LIElement";

export type ClipboardType = "single element" | "multiple elements";

export default interface LIClipboard {
    data: LIElement[];
}