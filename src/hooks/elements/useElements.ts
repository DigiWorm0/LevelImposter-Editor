import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import { MaybeLIElement } from "../../types/li/LIElement";
import { saveHistoryAtom } from "../map/history/useHistory";
import { elementsAtom } from "../map/useMap";

// Atoms
export const elementFamilyAtom = atomFamily((id: MaybeGUID) => {
    return atom(
        (get) => {
            const elements = get(elementsAtom);
            return elements.find((elem) => elem.id === id);
        },
        (get, set, elem: MaybeLIElement) => {
            const elements = get(elementsAtom);
            const index = elements.findIndex((e) => e.id === elem?.id);
            if (index >= 0 && elem) {
                const clone = [...elements];
                clone[index] = elem;
                set(elementsAtom, clone);
                set(saveHistoryAtom);
            }
        }
    );
}, (a, b) => a === b);


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