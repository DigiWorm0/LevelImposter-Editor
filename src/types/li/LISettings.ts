export default interface LISettings {
    isDevMode: boolean;
    isDarkMode: boolean;
    isGridVisible: boolean;
    gridSize: number;
    gridSpacing: number;
    gridSnapResolution: number;
    isGridSnapEnabled: boolean;
    isBrowserAccepted: boolean;
    isRoomNameVisible: boolean;
    invisibleOpacity: number;
    colliderHandleSize: number;
    colliderPreview: boolean;
    animateGIFOnSelect: boolean;
    language: string;
    scrollToSelection: boolean;
    elementNesting: boolean;
    isInfoVisible: boolean;
    isAudioDownmixEnabled: boolean;
}

export const DEFAULT_SETTINGS: LISettings = {
    isDevMode: false,
    isDarkMode: true,
    isGridVisible: true,
    gridSize: 25,
    gridSpacing: 100,
    gridSnapResolution: 0.1,
    isGridSnapEnabled: true,
    isBrowserAccepted: false,
    isRoomNameVisible: true,
    invisibleOpacity: 0.3,
    colliderHandleSize: 8,
    colliderPreview: true,
    animateGIFOnSelect: true,
    language: "auto",
    scrollToSelection: true,
    elementNesting: false,
    isInfoVisible: true,
    isAudioDownmixEnabled: true,
};