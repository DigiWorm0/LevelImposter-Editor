import GUID from '../types/generic/GUID';
import LIElement from '../types/li/LIElement';
import { getMap, setMap } from './useMap';
import useStorage, { clearStorageFor, getStorage, putStorage, useStorages } from './useStorage';

const DEFAULT_ELEM: LIElement = {
    id: "" as GUID,
    name: "",
    type: "",
    x: 0,
    y: 0,
    z: 0,
    rotation: 0,
    xScale: 0,
    yScale: 0,
    properties: {},
};

export default function useElement(id: GUID | undefined): [LIElement, (elem: LIElement) => void, number] {
    const [elem, setElem, v] = useStorage<LIElement>(id ? id : "", DEFAULT_ELEM);
    return [elem, setElem, v];
}

export function useElements(ids: GUID[]): [LIElement[], (elems: LIElement[]) => void] {
    const [elems, setElems] = useStorages<LIElement>(ids, DEFAULT_ELEM);
    return [elems, setElems];
}

export function getElement(id: GUID) {
    return getStorage<LIElement>(id, DEFAULT_ELEM);
}

export function setElement(elem: LIElement) {
    putStorage(elem.id, elem);
}

export function removeElement(id: GUID) {
    clearStorageFor(id);
    const map = getMap();
    const ids = map.elementIDs.filter(e => e !== id);
    setMap({ ...map, elementIDs: ids });
}

export function removeAllElements() {
    const map = getMap();
    map.elementIDs.forEach(id => clearStorageFor(id));
    setMap({ ...map, elementIDs: [] });
}