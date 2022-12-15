import LIElement from "./LIElement";
import LIMetadata from "./LIMetadata";
import LISound from "./LISound";

export default interface LIMap extends LIMetadata {
    elements: LIElement[];
    properties: {
        bgColor?: string;
        exileID?: string;
        showPingIndicator?: boolean;
        sabotageSound?: LISound;
    }
}