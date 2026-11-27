import LISound from "./LISound";

export default interface LIMapProperties {
    bgColor?: string;
    exileID?: string;
    pixelArtMode?: boolean;
    sabotageSound?: LISound;
    canRemix?: boolean;
    triggerLogging?: boolean;
    triggerDetectStackOverflow?: boolean;

    /// @deprecated Option is no longer used in-game
    showPingIndicator?: boolean;

    /// @deprecated Option is no longer used in-game
    preloadAllGIFs?: boolean;
}