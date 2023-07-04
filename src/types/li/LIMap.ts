import LIElement from "./LIElement";
import LIMetadata from "./LIMetadata";
import LISound from "./LISound";

export default interface LIMap extends LIMetadata {
    elements: LIElement[];
    properties: {
        bgColor?: string;
        exileID?: string;
        showPingIndicator?: boolean;
        pixelArtMode?: boolean;
        sabotageSound?: LISound;
        canRemix?: boolean;
        preloadAllGIFs?: boolean;
    }
}