import { atom, useAtomValue } from "jotai";
import LIElement from "../../types/li/LIElement";
import { elementsAtom } from "./useMap";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedConnectionsAtom = atom((get) => {
    const selectedElem = get(selectedElementAtom);

    const mapElements = get(elementsAtom);

    if (!selectedElem)
        return [];

    const leftVent = mapElements.find(e => e.id === selectedElem.properties.leftVent);
    const middleVent = mapElements.find(e => e.id === selectedElem.properties.middleVent);
    const rightVent = mapElements.find(e => e.id === selectedElem.properties.rightVent);
    const teleporter = mapElements.find(e => e.id === selectedElem.properties.teleporter);
    const roomParent = mapElements.find(e => e.id === selectedElem.properties.parent);
    const targetConnections = [leftVent, middleVent, rightVent, teleporter, roomParent].filter(e => e != undefined) as LIElement[];

    const sourceConnections = mapElements.filter(e => {
        return e.properties.leftVent === selectedElem.id ||
            e.properties.middleVent === selectedElem.id ||
            e.properties.rightVent === selectedElem.id ||
            e.properties.teleporter === selectedElem.id ||
            e.properties.parent === selectedElem.id;
    });

    return [targetConnections, sourceConnections];
});

// Debug
selectedConnectionsAtom.debugLabel = "selectedConnectionsAtom";

// Hooks
export function useSelectedConnections() {
    return useAtomValue(selectedConnectionsAtom);
}