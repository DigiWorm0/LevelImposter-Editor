import LISound from "./LISound";

export default interface LIMapProperties {
    bgColor?: string;
    exileID?: string;
    showPingIndicator?: boolean;
    pixelArtMode?: boolean;
    sabotageSound?: LISound;
    canRemix?: boolean;
    preloadAllGIFs?: boolean;
    triggerLogging?: boolean;
}