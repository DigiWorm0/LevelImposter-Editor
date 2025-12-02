import {atom, useAtomValue} from "jotai";
import {selectedElementTypeAtom} from "../elements/useSelectedElemType";

export const availableSpriteAnimTypesAtom = atom((get) => {
    const selectedElemType = get(selectedElementTypeAtom);

    const types = ["default"];
    if (selectedElemType?.startsWith("util-vent"))
        types.push("openVent", "closeVent");

    return types;
});

export default function useAvailableSpriteAnimTypes() {
    return useAtomValue(availableSpriteAnimTypesAtom);
}