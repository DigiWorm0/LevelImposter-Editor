import {atom, useAtomValue} from "jotai";
import {selectedElementTypeAtom} from "@editor/selection/stores/elementSelectionStore";
import {atomFamily} from "jotai/utils";

export const isSelectedElementTypeAtomFamily = atomFamily((type: string) => atom((get) => {
    const selectedElementType = get(selectedElementTypeAtom);
    return type === selectedElementType;
}));

export default function useIsSelectedElemType(type: string) {
    return useAtomValue(isSelectedElementTypeAtomFamily(type));
}