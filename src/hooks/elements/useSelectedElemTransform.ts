import { atomFamily } from "jotai/utils";
import { atom, useAtom } from "jotai";
import LIElement from "../../types/li/LIElement";
import { selectedElementAtom } from "./useSelectedElem";

export const elementPropertyAtom = atomFamily((prop: keyof LIElement) => {
    return atom((get) => {
        const element = get(selectedElementAtom);
        return element?.[prop];
    }, (get, set, newValue: any) => {
        const element = get(selectedElementAtom);
        if (element)
            set(selectedElementAtom, { ...element, [prop]: newValue });
    });
});

export default function useSelectedElemTransform<T>(prop: keyof LIElement) {
    return useAtom(elementPropertyAtom(prop)) as [T | undefined, (update: T) => void];
}