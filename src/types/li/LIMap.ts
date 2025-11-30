import LIElement from "./LIElement";
import LIMetadata from "./LIMetadata";
import MapAsset from "./MapAsset";
import LIMapProperties from "./LIMapProperties";
import LISpriteAnimation from "./LISpriteAnimation";

export default interface LIMap extends LIMetadata {
    elements: LIElement[];
    animations?: LISpriteAnimation[];
    assets?: MapAsset[];
    properties: LIMapProperties;
}