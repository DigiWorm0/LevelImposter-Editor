import GUID from "../generic/GUID";
import LIElement from "./LIElement";
import LIMetadata from "./LIMetadata";

export default interface LIMapFile extends LIMetadata {
    elements: LIElement[];
}