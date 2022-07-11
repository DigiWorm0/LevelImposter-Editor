import GUID from '../types/generic/GUID';
import LIMap from '../types/li/LIMap';
import useIndexedDB, { getAutosave, putAutosave } from './storage/useIndexedDB';

const CURRENT_KEY = 'current';
const DEFAULT_MAP: LIMap = {
    id: "" as GUID,
    v: 0,
    name: "New Map",
    description: "",
    isPublic: false,
    elementIDs: [],
};

export default function useMap(): [LIMap, (map: LIMap) => void] {
    const [map, setMap] = useIndexedDB<LIMap>(CURRENT_KEY, DEFAULT_MAP);
    return [map, setMap];
}

export function getMap() {
    return getAutosave<LIMap>(CURRENT_KEY, DEFAULT_MAP);
}

export function setMap(map: LIMap) {
    putAutosave(CURRENT_KEY, map);
}

export function clearMap() {
    putAutosave(CURRENT_KEY, DEFAULT_MAP);
}