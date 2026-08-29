import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/types/common/GUID";
import {atom} from "jotai";
import LIElement from "@/types/li/LIElement";
import {allElementsAtom, elementAtomFamily} from "@editor/documentStore";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";

export const connectionsAtomFamily = atomFamily((elemID: MaybeGUID) =>
    atom<[LIElement[], LIElement[]]>((get) => {
        const elem = get(elementAtomFamily(elemID));
        if (!elem)
            return [[], []];

        const allElements = get(allElementsAtom);

        // Find all connected elements
        const leftVent = allElements.find(e => e.id === elem.properties.leftVent);
        const middleVent = allElements.find(e => e.id === elem.properties.middleVent);
        const rightVent = allElements.find(e => e.id === elem.properties.rightVent);
        const teleporter = allElements.find(e => e.id === elem.properties.teleporter);
        const roomParent = allElements.find(e => e.id === elem.properties.parent);
        const doorA = allElements.find(e => e.id === elem.properties.doorA);
        const doorB = allElements.find(e => e.id === elem.properties.doorB);
        const triggerValue = allElements.find(e => e.id === elem.properties.triggerGateValueID);
        const comparatorValue1 = allElements.find(e => e.id === elem.properties.comparatorValueID1);
        const comparatorValue2 = allElements.find(e => e.id === elem.properties.comparatorValueID2);
        const triggers = allElements.filter(e => elem.properties.triggers?.find(t => t.elemID === e.id) != undefined);
        const animTargets = allElements.filter(e => elem.properties.animTargets?.find(t => t.id === e.id) != undefined);

        const targetConnections = [
            leftVent,
            middleVent,
            rightVent,
            teleporter,
            roomParent,
            doorA,
            doorB,
            triggerValue,
            comparatorValue1,
            comparatorValue2,
            ...triggers,
            ...animTargets
        ].filter(e => e != undefined) as LIElement[];

        const sourceConnections = allElements.filter(e => {
            return e.properties.leftVent === elem.id ||
                e.properties.middleVent === elem.id ||
                e.properties.rightVent === elem.id ||
                e.properties.teleporter === elem.id ||
                e.properties.parent === elem.id ||
                e.properties.doorA === elem.id ||
                e.properties.doorB === elem.id ||
                e.properties.triggerGateValueID === elem.id ||
                e.properties.comparatorValueID1 === elem.id ||
                e.properties.comparatorValueID2 === elem.id ||
                e.properties.triggers?.some(t => t.elemID === elem.id) ||
                e.properties.animTargets?.some(t => t.id === elem.id);
        });

        return [targetConnections, sourceConnections];
    })
);
export const selectedConnectionsAtom = atom<[LIElement[], LIElement[]]>((get) => {
    const selectedElemID = get(selectedElementIDAtom);
    if (!selectedElemID)
        return [[], []];

    return get(connectionsAtomFamily(selectedElemID));
});