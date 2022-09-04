import LIElement from "./LIElement";

export type ClipboardType = "single element" | "multiple elements";

export default interface LIClipboard {
    type: ClipboardType;
    data: LIElement | LIElement[];
}