import GUID from '../types/generic/GUID';
import LIElement from '../types/li/LIElement';
import useStorage, { getStorage, putStorage, useStorages } from './useStorage';

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

export default function useElement(id: GUID): [LIElement, (elem: LIElement) => void] {
    const [elem, setElem] = useStorage<LIElement>(id, DEFAULT_ELEM);
    return [elem, setElem];
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