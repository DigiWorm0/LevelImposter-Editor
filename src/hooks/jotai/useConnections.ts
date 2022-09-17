import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";
import { elementFamilyAtom } from "./useElements";
import { elementsAtom } from "./useMap";
import { selectedElementIDAtom } from "./useSelectedElem";

// Atoms
export const connectionsAtomFamily = atomFamily((elemID: MaybeGUID) => {
    const connectionsAtom = atom((get) => {
        const elem = get(elementFamilyAtom(elemID));

        if (!elem)
            return [];

        const mapElements = get(elementsAtom);
        const leftVent = mapElements.find(e => e.id === elem.properties.leftVent);
        const middleVent = mapElements.find(e => e.id === elem.properties.middleVent);
        const rightVent = mapElements.find(e => e.id === elem.properties.rightVent);
        const teleporter = mapElements.find(e => e.id === elem.properties.teleporter);
        const roomParent = mapElements.find(e => e.id === elem.properties.parent);
        const targetConnections = [leftVent, middleVent, rightVent, teleporter, roomParent].filter(e => e != undefined) as LIElement[];

    const leftVent = mapElements.find(e => e.id === selectedElem.properties.leftVent);
    const middleVent = mapElements.find(e => e.id === selectedElem.properties.middleVent);
    const rightVent = mapElements.find(e => e.id === selectedElem.properties.rightVent);
    const teleporter = mapElements.find(e => e.id === selectedElem.properties.teleporter);
    const roomParent = mapElements.find(e => e.id === selectedElem.properties.parent);
    const triggers = mapElements.filter(e => selectedElem.properties.triggers?.find(t => t.elemID === e.id) != undefined);
    const targetConnections = [leftVent, middleVent, rightVent, teleporter, roomParent, ...triggers].filter(e => e != undefined) as LIElement[];

    const sourceConnections = mapElements.filter(e => {
        return e.properties.leftVent === selectedElem.id ||
            e.properties.middleVent === selectedElem.id ||
            e.properties.rightVent === selectedElem.id ||
            e.properties.teleporter === selectedElem.id ||
            e.properties.parent === selectedElem.id ||
            e.properties.triggers?.some(t => t.elemID === selectedElem.id);
    });
    connectionsAtom.debugLabel = `connectionsAtomFamily(${elemID})`;
    return connectionsAtom;
})
export const selectedConnectionsAtom = atom((get) => {
    const selectedElemID = get(selectedElementIDAtom);
    return get(connectionsAtomFamily(selectedElemID));

});

// Debug
selectedConnectionsAtom.debugLabel = "selectedConnectionsAtom";

// Hooks
export function useSelectedConnections() {
    return useAtomValue(selectedConnectionsAtom);
}
export function useConnections(id: MaybeGUID) {
    return useAtomValue(connectionsAtomFamily(id));
}