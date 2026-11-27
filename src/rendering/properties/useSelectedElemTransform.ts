import {atomFamily} from "jotai/utils";
import {atom, useAtom} from "jotai";
import type {MapElement} from "@editor/document/types/MapDocument";
import {selectedElementAtom} from "@editor/selection/stores/elementSelectionStore";
import {setSelectedElementTransformProp} from "@editor/document/elements/setElementTransformProp";
import executeCommand from "@editor/history/executeCommand";

export type NumericTransformProperty = "x" | "y" | "z" | "xScale" | "yScale" | "rotation";
type TransformProperty = NumericTransformProperty | "type" | "name";

const selectedElemTransformAtomFamily = atomFamily((prop: TransformProperty) => {
    return atom((get) => {
        const element = get(selectedElementAtom);
        return element?.[prop];
    }, (_get, _set, newValue: MapElement[TransformProperty]) => {
        executeCommand(setSelectedElementTransformProp(prop, newValue));
    });
});

export default function useSelectedElemTransform<T extends TransformProperty>(prop: T) {
    return useAtom(selectedElemTransformAtomFamily(prop)) as [
        MapElement[T] | undefined, (update: MapElement[T]) => void
    ];
}
