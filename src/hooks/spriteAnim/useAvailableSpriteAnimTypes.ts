import {atom, useAtomValue} from "jotai";
import {selectedElementTypeAtom} from "../../editor/state/selection/elementSelectionStore";

export const availableSpriteAnimTypesAtom = atom((get) => {
    const selectedElemType = get(selectedElementTypeAtom);

    const types = ["default"];
    if (selectedElemType?.startsWith("util-vent"))
        types.push("enterVent", "exitVent");

    if (selectedElemType?.startsWith("sab-door"))
        types.push("openDoor", "closeDoor");

    if (selectedElemType === "util-cam")
        types.push("camsActive");

    return types;
});

export default function useAvailableSpriteAnimTypes() {
    return useAtomValue(availableSpriteAnimTypesAtom);
}