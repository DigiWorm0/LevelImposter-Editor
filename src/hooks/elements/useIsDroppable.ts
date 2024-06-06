import { atom, useAtomValue } from "jotai/index";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import { draggingElementIDAtom } from "./useDraggingElementID";
import { elementChildIDsAtomFamily } from "./useElementChildIDs";

export const droppableBlacklistAtom = atom((get) => {
    const blacklist: MaybeGUID[] = [];
    const blacklistChildren = (childID: MaybeGUID) => {
        if (childID === undefined)
            return;
        const children = get(elementChildIDsAtomFamily(childID));
        children.forEach((child) => {
            blacklistChildren(child);
        });
        blacklist.push(childID);
    };

    const draggingElementID = get(draggingElementIDAtom);
    blacklistChildren(draggingElementID);
    return blacklist;
})
export const isDroppableAtomFamily = atomFamily((id: MaybeGUID) => {
    const isDroppableAtom = atom(
        (get) => {
            const blacklist = get(droppableBlacklistAtom);
            return !blacklist.includes(id);
        }
    );
    isDroppableAtom.debugLabel = `isDroppableAtomFamily(${id})`;
    return isDroppableAtom;
}, (a, b) => a === b);

export default function useIsDroppable(id: MaybeGUID) {
    return useAtomValue(isDroppableAtomFamily(id));
}