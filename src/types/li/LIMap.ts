import LIElement from "./LIElement";
import LIMetadata from "./LIMetadata";
import LISound from "./LISound";
import MapAsset from "./MapAssetDB";

export default interface LIMap extends LIMetadata {
    elements: LIElement[];
    assets?: MapAsset[];
    properties: {
        bgColor?: string;
        exileID?: string;
        showPingIndicator?: boolean;
        pixelArtMode?: boolean;
        sabotageSound?: LISound;
        canRemix?: boolean;
        preloadAllGIFs?: boolean;
        triggerLogging?: boolean;
    }
}