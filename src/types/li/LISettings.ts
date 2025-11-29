export default interface LISettings {
    isDevMode: boolean;
    isDarkMode: boolean;
    isGridVisible: boolean;
    gridSnapResolution: number;
    isGridSnapEnabled: boolean;
    isTimelineSnapEnabled: boolean;
    isBrowserAccepted: boolean;
    isRoomNameVisible: boolean;
    invisibleOpacity: number;
    colliderHandleSize: number;
    colliderPreview: boolean;
    animPreview: boolean;
    animateGIFOnSelect: boolean;
    language: string;
    scrollToSelection: boolean;
    elementNesting: boolean;
    isInfoVisible: boolean;
    isAudioDownmixEnabled: boolean;
    autoEncodeToDDS?: boolean;
    editType: boolean;
    showConnectionArrows: boolean;
    connectionArrowHeadSize: number;
    connectionArrowWidth: number;
    hideGroups?: boolean;
}

export const DEFAULT_SETTINGS: LISettings = {
    isDevMode: false,
    isDarkMode: true,
    isGridVisible: true,
    gridSnapResolution: 0.1,
    isGridSnapEnabled: true,
    isTimelineSnapEnabled: true,
    isBrowserAccepted: false,
    isRoomNameVisible: true,
    invisibleOpacity: 0.3,
    colliderHandleSize: 8,
    colliderPreview: true,
    animPreview: true,
    animateGIFOnSelect: true,
    language: "auto",
    scrollToSelection: true,
    elementNesting: false,
    isInfoVisible: true,
    isAudioDownmixEnabled: true,
    autoEncodeToDDS: true,
    editType: false,
    showConnectionArrows: true,
    connectionArrowHeadSize: 10,
    connectionArrowWidth: 6,
    hideGroups: false
};