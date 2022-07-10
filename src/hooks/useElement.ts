import GUID from '../types/generic/GUID';
import LIElement from '../types/li/LIElement';
import useAutosave, { clearAutosaveFor, getAutosave, putAutosave, useAutosaves } from './storage/useIndexedDB';
import { getMap, setMap } from './useMap';
import { useStores } from './storage/useStore';

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
    const [elem, setElem, v] = useAutosave<LIElement>(id ? id : "", DEFAULT_ELEM);
    return [elem, setElem, v];
}

export function useElements(ids: GUID[]): [LIElement[]] {
    const [elems] = useAutosaves<LIElement>(ids, DEFAULT_ELEM);
    return [elems];
}

export function getElement(id: GUID) {
    return getAutosave<LIElement>(id, DEFAULT_ELEM);
}

export function setElement(elem: LIElement) {
    putAutosave(elem.id, elem);
}

export function removeElement(id: GUID) {
    clearAutosaveFor(id);
    const map = getMap();
    const ids = map.elementIDs.filter(e => e !== id);
    setMap({ ...map, elementIDs: ids });
}

export function clearElements() {
    const map = getMap();
    map.elementIDs.forEach(id => clearAutosaveFor(id));
    setMap({ ...map, elementIDs: [] });
}