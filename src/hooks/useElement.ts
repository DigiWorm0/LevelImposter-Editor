import GUID from '../types/GUID';
import LIElement from '../types/LIElement';
import useStorage, { getStorage, putStorage } from './useStorage';

const DEFAULT_ELEM: LIElement = {
    id: "" as GUID,
    name: "Example Map",
    type: "",
    x: 0,
    y: 0,
    z: 0,
    rotation: 0,
    xScale: 1,
    yScale: 1,
    properties: {},
};

export default function useElement(id: GUID): [LIElement, (map: LIElement) => void] {
    const [map, setMap] = useStorage<LIElement>(id, DEFAULT_ELEM);
    return [map, setMap];
}

export function getElem(id: GUID) {
    return getStorage<LIElement>(id, DEFAULT_ELEM);
}

export function setElem(elem: LIElement) {
    putStorage(elem.id, elem);
}