import LIElement from "./LIElement";
import LIMetadata from "./LIMetadata";

export default interface LIMap extends LIMetadata {
    elements: LIElement[];
    properties: {
        bgColor?: string;
        resources?: Record<string, string>;
    }
}