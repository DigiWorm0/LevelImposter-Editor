import LIElement from "./LIElement";
import LILayer from "./LILayer";
import LIMetadata from "./LIMetadata";

export default interface LIMap extends LIMetadata {
    elements: LIElement[];
    properties: {
        layers?: LILayer[];
        bgColor?: string;
    }
}