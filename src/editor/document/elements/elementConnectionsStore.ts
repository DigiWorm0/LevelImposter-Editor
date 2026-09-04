import {atomFamily} from "jotai/utils";
import GUID, {MaybeGUID} from "@shared/types/GUID";
import {atom} from "jotai";
import {elementAtomFamily} from "@editor/document/elements/useElement";
import {elementIDsAtom} from "@/hooks/elements/useElementIDs";

export const outboundConnectionIDsAtomFamily = atomFamily((elemID: MaybeGUID) => atom(get => {
    const elem = get(elementAtomFamily(elemID));
    if (!elem)
        return [];

    return [
        elem.properties.leftVent,
        elem.properties.middleVent,
        elem.properties.rightVent,
        elem.properties.teleporter,
        elem.properties.parent,
        elem.properties.doorA,
        elem.properties.doorB,
        elem.properties.triggerGateValueID,
        elem.properties.comparatorValueID1,
        elem.properties.comparatorValueID2,
        ...(elem.properties.triggers?.map(t => t.elemID) || []),
        ...(elem.properties.animTargets?.map(t => t.id) || [])
    ].filter(id => id != undefined) as GUID[];
}));

export const inboundConnectionIDsAtomFamily = atomFamily((elemID: MaybeGUID) => atom(get => {
    const allElementIDs = get(elementIDsAtom);

    return allElementIDs.filter(id => {

        // Skip myself
        if (id === elemID)
            return false;

        // Check if the current element has an outbound connection to elemID
        const outboundConnections = get(outboundConnectionIDsAtomFamily(id));
        return outboundConnections.includes(elemID as GUID);
    });
}));