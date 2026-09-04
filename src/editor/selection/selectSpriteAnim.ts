import {MaybeGUID} from "@shared/types/GUID";
import store from "@shared/store";
import {selectedSpriteAnimIDAtom, selectedSpriteAnimTypeAtom} from "@editor/selection/stores/spriteAnimSelectionStore";
import {availableSpriteAnimTypesAtom} from "@editor/spriteAnim/availableSpriteAnimTypes";

export const selectSpriteAnim = (id: MaybeGUID, type: string) => {
    const availableTypes = store.get(availableSpriteAnimTypesAtom);
    if (!availableTypes.includes(type))
        type = "default";

    store.set(selectedSpriteAnimIDAtom, id);
    store.set(selectedSpriteAnimTypeAtom, type);
};