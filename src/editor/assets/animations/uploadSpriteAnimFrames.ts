import uploadImageAssets from "@editor/assets/images/uploadImageAssets";
import {activeSpriteAnimTypeAtom, selectedSpriteAnimAtom} from "@editor/spriteAnim/spriteAnimStore";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";
import primaryStore from "@shared/store";
import {generateGUID} from "@shared/types/GUID";

/**
 * Opens a file dialog to upload sprite animation frames.
 */
export default async function uploadSpriteAnimFrames() {
    const elementID = primaryStore.get(selectedElementIDAtom);
    if (!elementID)
        return;

    const type = primaryStore.get(activeSpriteAnimTypeAtom);
    const imageAssets = await uploadImageAssets();
    if (primaryStore.get(selectedElementIDAtom) !== elementID || primaryStore.get(activeSpriteAnimTypeAtom) !== type)
        return;

    const animation = primaryStore.get(selectedSpriteAnimAtom) ?? {
        id: generateGUID(),
        type,
        frames: [],
        loop: true,
    };
    const newFrames = imageAssets.map(asset => ({
        id: generateGUID(),
        spriteID: asset.id,
        delay: 100
    }));
    primaryStore.set(selectedSpriteAnimAtom, {...animation, frames: [...animation.frames, ...newFrames]});
}
