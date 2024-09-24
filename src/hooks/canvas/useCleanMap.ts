import {atom, useSetAtom} from "jotai";
import {elementIDsAtom} from "../elements/useElementIDs";
import {selectedElementIDAtom} from "../elements/useSelectedElem";
import {autoScaleSpriteAtom} from "./useAutoScaleSprite";
import {autoCropSpriteAtom} from "./useAutoCropSprite";
import {trimAssetsAtom} from "../assets/useTrimMapAssets";
import {mergeAssetsAtom} from "../assets/useMergeMapAssets";
import {saveHistoryAtom} from "../map/history/useHistory";

export interface CleanMapOptions {
    autoScale?: boolean;
    scaleDownOnly?: boolean;
    autoCrop?: boolean;
    trimAssets?: boolean;
    mergeAssets?: boolean;

    onProgress?: (percent: number) => void;
}

export const cleanMapAtom = atom(null, async (
    get,
    set,
    options: CleanMapOptions
) => {
    const onProgress = options.onProgress ?? (() => {
    });
    const elementIDs = get(elementIDsAtom);

    // Fix All Elements
    for (const id of elementIDs) {
        // Progress
        onProgress(elementIDs.indexOf(id) / elementIDs.length);

        // Select Element
        set(selectedElementIDAtom, id);

        // Clean Element
        if (options.autoScale)
            await set(autoScaleSpriteAtom, options.scaleDownOnly);
        if (options.autoCrop)
            await set(autoCropSpriteAtom);
    }

    // Clean Assets
    if (options.trimAssets)
        set(trimAssetsAtom);
    if (options.mergeAssets)
        await set(mergeAssetsAtom, onProgress);

    // Save History
    set(saveHistoryAtom);
});

export default function useCleanMap() {
    return useSetAtom(cleanMapAtom);
}