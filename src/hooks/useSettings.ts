import LISettings from '../types/li/LISettings';
import useStorage, { getStorage, putStorage } from './useStorage';

const CURRENT_KEY = 'settings';
const DEFAULT_SETTINGS: LISettings = {
    isDarkMode: true,
    isGridVisible: true,
    isAxisVisible: true,
};

export default function useSettings(): [LISettings, (settings: LISettings) => void] {
    const [settings, setSettings] = useStorage<LISettings>(CURRENT_KEY, DEFAULT_SETTINGS);
    return [settings, setSettings];
}

export function getSettings() {
    return getStorage<LISettings>(CURRENT_KEY, DEFAULT_SETTINGS);
}

export function setSettings(settings: LISettings) {
    putStorage(CURRENT_KEY, settings);
}