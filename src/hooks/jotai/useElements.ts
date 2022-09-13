import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import LIElement, { MaybeLIElement } from "../../types/li/LIElement";
import { elementsAtom } from "./useMap";
import { mouseXAtom, mouseYAtom } from "./useMouse";

// Atoms
export const elementFamilyAtom = atomFamily((id: MaybeGUID) => {
    const elemAtom = atom(
        (get) => {
            const elements = get(elementsAtom);
            return elements.find((elem) => elem.id === id);
        },
        (get, set, elem: MaybeLIElement) => {
            const elements = get(elementsAtom);
            const index = elements.findIndex((e) => e.id === elem?.id);
            if (index >= 0 && elem) {
                elements[index] = { ...elem };
                set(elementsAtom, [...elements]);
            }
        }
    );
    elemAtom.debugLabel = `elementFamilyAtom(${id})`;
    return elemAtom;
}, (a, b) => a === b);
export const addElementAtMouseAtom = atom(null, (get, set, elem: LIElement) => {
    const mouseX = get(mouseXAtom);
    const mouseY = get(mouseYAtom);
    elem.x = mouseX;
    elem.y = mouseY;
    set(elementsAtom, [...get(elementsAtom), elem]);
});
export const addElementAtom = atom(null, (get, set, elem: LIElement) => {
    set(elementsAtom, [...get(elementsAtom), elem]);
});
export const elementChildrenFamilyAtom = atomFamily((id: MaybeGUID) => {
    const elemChildrenAtom = atom(
        (get) => {
            const elements = get(elementsAtom);
            return elements.filter((elem) => elem.parentID === id).map((elem) => elem.id);
        }
    );
    elemChildrenAtom.debugLabel = `elementChildrenFamilyAtom(${id})`;
    return elemChildrenAtom;
}, (a, b) => a === b);
export const draggingElementIDAtom = atom<MaybeGUID>(undefined);
export const isDroppableAtomFamily = atomFamily((id: MaybeGUID) => {
    const isDroppableAtom = atom(
        (get) => {
            const blacklist: MaybeGUID[] = [];
            const blacklistChildren = (parentID: MaybeGUID, childID: MaybeGUID) => {
                if (childID === undefined)
                    return;
                const children = get(elementChildrenFamilyAtom(childID));
                children.forEach((child) => {
                    blacklistChildren(childID, child);
                });
                blacklist.push(childID);
            };

            const draggingElementID = get(draggingElementIDAtom);
            blacklistChildren(undefined, draggingElementID);

            return !blacklist.includes(id);
        }
    );
    isDroppableAtom.debugLabel = `isDroppableAtomFamily(${id})`;
    return isDroppableAtom;
}, (a, b) => a === b);

// Debug
addElementAtMouseAtom.debugLabel = "addElementAtMouseAtom";
addElementAtom.debugLabel = "addElementAtom";


// Hooks
export default function useElement(id: MaybeGUID) {
    return useAtom(elementFamilyAtom(id));
}

export function useSetElement(id: MaybeGUID) {
    return useSetAtom(elementFamilyAtom(id));
}

export function useElementValue(id: MaybeGUID) {
    return useAtomValue(elementFamilyAtom(id));
}

export function useAddElement() {
    return useSetAtom(addElementAtom);
}

export function useAddElementAtMouse() {
    return useSetAtom(addElementAtMouseAtom);
}

export function useElementChildren(id: MaybeGUID) {
    return useAtomValue(elementChildrenFamilyAtom(id));
}
export function useDraggingElementID() {
    return useAtom(draggingElementIDAtom);
}
export function useIsDroppable(id: MaybeGUID) {
    return useAtomValue(isDroppableAtomFamily(id));
}