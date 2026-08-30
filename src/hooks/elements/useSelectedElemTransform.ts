import {atomFamily} from "jotai/utils";
import {atom, useAtom} from "jotai";
import LIElement from "../../types/li/LIElement";
import {selectedElementAtom} from "@editor/selection/stores/elementSelectionStore";
import {setSelectedElementTransformProp} from "@editor/document/elements/setElementTransformProp";
import executeCommand from "@editor/history/executeCommand";

export const selectedElemTransformAtomFamily = atomFamily((prop: keyof LIElement) => {
    return atom((get) => {
        const element = get(selectedElementAtom);
        return element?.[prop];
    }, (_get, _set, newValue: any) => {
        executeCommand(setSelectedElementTransformProp(prop, newValue));
    });
});

export default function useSelectedElemTransform<T>(prop: keyof LIElement) {
    return useAtom(selectedElemTransformAtomFamily(prop)) as [T | undefined, (update: T) => void];
}