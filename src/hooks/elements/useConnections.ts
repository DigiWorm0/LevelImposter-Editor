import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";
import {elementsAtom} from "../map/useMap";
import {elementFamilyAtom} from "./useElements";
import {selectedElementIDAtom} from "./useSelectedElem";

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
        const doorA = mapElements.find(e => e.id === elem.properties.doorA);
        const doorB = mapElements.find(e => e.id === elem.properties.doorB);
        const triggers = mapElements.filter(e => elem.properties.triggers?.find(t => t.elemID === e.id) != undefined);
        const animTargets = mapElements.filter(e => elem.properties.animTargets?.find(t => t.id === e.id) != undefined);

        const targetConnections = [
            leftVent,
            middleVent,
            rightVent,
            teleporter,
            roomParent,
            doorA,
            doorB,
            ...triggers,
            ...animTargets
        ].filter(e => e != undefined) as LIElement[];

        const sourceConnections = mapElements.filter(e => {
            return e.properties.leftVent === elem.id ||
                e.properties.middleVent === elem.id ||
                e.properties.rightVent === elem.id ||
                e.properties.teleporter === elem.id ||
                e.properties.parent === elem.id ||
                e.properties.doorA === elem.id ||
                e.properties.doorB === elem.id ||
                e.properties.triggers?.some(t => t.elemID === elem.id) ||
                e.properties.animTargets?.some(t => t.id === elem.id);
        });

        return [targetConnections, sourceConnections];
    });
    connectionsAtom.debugLabel = `connectionsAtomFamily(${elemID})`;
    return connectionsAtom;
});
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