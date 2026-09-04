import {MaybeGUID} from "@shared/types/GUID";
import {assetsAtomFamily} from "@editor/assets/assetsStore";
import {textureFromURLAtomFamily} from "@/rendering/canvas2/hooks/texture/useTextureFromURL";
import cachedAtomFamily from "@shared/atomics/cachedAtomFamily";

export const textureAtomFamily = cachedAtomFamily((assetID: MaybeGUID, get) => {
    // Get map asset
    const asset = get(assetsAtomFamily(assetID));
    if (!asset || !asset.url)
        return null;

    // Load texture from URL
    return get(textureFromURLAtomFamily(asset.url));
});