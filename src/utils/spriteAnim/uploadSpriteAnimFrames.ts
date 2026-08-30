import uploadImageAssets from "@editor/assets/images/uploadImageAssets";
import {selectedSpriteAnimAtom} from "@/hooks/spriteAnim/useSelectedSpriteAnim";
import {selectedSpriteAnimTypeAtom} from "@/hooks/spriteAnim/useSelectedSpriteAnimType";
import primaryStore from "@/shared/store";
import {generateGUID} from "@/shared/types/GUID";

/**
 * Opens a file dialog to upload sprite animation frames.
 */
export default async function uploadSpriteAnimFrames() {
    const imageAssets = await uploadImageAssets();
    let animation = primaryStore.get(selectedSpriteAnimAtom);

    // Create new animation if none selected
    if (!animation) {
        const selectedType = primaryStore.get(selectedSpriteAnimTypeAtom);
        animation = {
            id: generateGUID(),
            type: selectedType,
            frames: [],
            loop: true,
        };
    }

    // Append new frames to animation
    animation.frames = [
        ...animation.frames,
        ...imageAssets.map(asset => ({
            id: generateGUID(),
            spriteID: asset.id,
            delay: 100
        })),
    ];

    // Save updated animation
    primaryStore.set(selectedSpriteAnimAtom, {...animation});
}