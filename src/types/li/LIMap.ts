import LIElement from "./LIElement";
import LIMetadata from "./LIMetadata";
import MapAsset from "./MapAsset";
import LIMapProperties from "./LIMapProperties";
import LISpriteAtlas from "./LISpriteAtlas";

export default interface LIMap extends LIMetadata {
    elements: LIElement[];
    spriteAtlases?: LISpriteAtlas[];
    assets?: MapAsset[];
    properties: LIMapProperties;
}