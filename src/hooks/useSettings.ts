import LISettings from '../types/li/LISettings';
import useStorage from './storage/useStorage';
import useStore, { getStore, putStore } from './storage/useStore';

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