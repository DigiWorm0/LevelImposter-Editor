import React from 'react';
import GUID from '../types/generic/GUID';
import LIMap from '../types/li/LIMap';
import useStorage, { getStorage, putStorage } from './useStorage';

const CURRENT_KEY = 'current';
const DEFAULT_MAP: LIMap = {
    id: "" as GUID,
    name: "Example Map",
    description: "",
    elementIDs: [],
};

export default function useMap(): [LIMap, (map: LIMap) => void] {
    const [map, setMap] = useStorage<LIMap>(CURRENT_KEY, DEFAULT_MAP);
    return [map, setMap];
}

export function getMap() {
    return getStorage<LIMap>(CURRENT_KEY, DEFAULT_MAP);
}

export function setMap(map: LIMap) {
    putStorage(CURRENT_KEY, map);
}