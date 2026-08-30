import {uploadImageAsset} from "@editor/assets/images/uploadImageAssets";
import {selectedSpriteAnimAtom} from "@/hooks/spriteAnim/useSelectedSpriteAnim";
import {convertGIFAssetToSpriteAnim} from "@editor/assets/images/convertGIFToSpriteAnimation";
import {selectedSpriteAnimTypeAtom} from "@/hooks/spriteAnim/useSelectedSpriteAnimType";
import primaryStore from "@/shared/store";

/**
 * Opens a file dialog to upload sprite animation frames.
 */
export default async function uploadSpriteAnimGIF() {

    // Upload GIF image asset
    const imageAsset = await uploadImageAsset("image/gif");
    if (imageAsset.type !== "image/gif")
        throw new Error(`Uploaded asset is not a GIF: ${imageAsset.type}`);

    // Convert uploaded GIF asset to sprite animation
    const animation = await convertGIFAssetToSpriteAnim(imageAsset.id);

    // Update animation type to selected type
    animation.type = primaryStore.get(selectedSpriteAnimTypeAtom);

    // Save updated animation
    primaryStore.set(selectedSpriteAnimAtom, {...animation});
}