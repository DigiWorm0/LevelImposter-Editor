import {uploadImageAsset} from "@editor/assets/images/uploadImageAssets";
import {activeSpriteAnimTypeAtom, selectedSpriteAnimAtom} from "@editor/spriteAnim/spriteAnimStore";
import {convertGIFAssetToSpriteAnim} from "@editor/assets/animations/convertGIFToSpriteAnimation";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";
import primaryStore from "@shared/store";

/**
 * Opens a file dialog to upload sprite animation frames.
 */
export default async function uploadSpriteAnimGIF() {
    const elementID = primaryStore.get(selectedElementIDAtom);
    if (!elementID)
        return;

    const type = primaryStore.get(activeSpriteAnimTypeAtom);
    // Upload GIF image asset
    const imageAsset = await uploadImageAsset("image/gif");
    if (imageAsset.type !== "image/gif")
        throw new Error(`Uploaded asset is not a GIF: ${imageAsset.type}`);

    // Convert uploaded GIF asset to sprite animation
    const animation = await convertGIFAssetToSpriteAnim(imageAsset.id);

    if (primaryStore.get(selectedElementIDAtom) !== elementID || primaryStore.get(activeSpriteAnimTypeAtom) !== type)
        return;

    // Save updated animation
    primaryStore.set(selectedSpriteAnimAtom, {...animation, type});
}
