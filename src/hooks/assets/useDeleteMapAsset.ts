import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";
import {mapAssetsAtom} from "./useMapAssets";
import {mapAssetsAtomFamily} from "./useMapAsset";
import {textureAtomFamily} from "../texture/useTexture";

export const deleteMapAssetAtom = atom(null, (get, set, id: MaybeGUID) => {

    // Get asset
    const mapAsset = get(mapAssetsAtomFamily(id));
    if (!mapAsset)
        return;

    console.log("Deleting map asset:", id);

    // Clean up PIXI textures
    get(textureAtomFamily(id))
        .then(texture => {
            if (texture && !texture.destroyed)
                texture.destroy(true);
        })
        .catch(console.error);

    // Release URL object
    URL.revokeObjectURL(mapAsset.url);

    // Remove from map assets
    const mapAssets = get(mapAssetsAtom) || [];
    set(mapAssetsAtom, mapAssets.filter(asset => asset.id !== id));
});
deleteMapAssetAtom.debugLabel = "deleteMapAssetAtom";

export default function useDeleteMapAsset() {
    return useSetAtom(deleteMapAssetAtom);
}