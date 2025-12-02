import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";
import {mapAssetsAtom} from "./useMapAssets";
import {mapAssetsAtomFamily} from "./useMapAsset";
import {spriteAtomFamily} from "../sprites/useSprite";
import {textureAtomFamily} from "../texture/useTexture";
import {Texture} from "pixi.js";

export const deleteMapAssetAtom = atom(null, (get, set, id: MaybeGUID) => {

    // Get asset
    const mapAsset = get(mapAssetsAtomFamily(id));
    if (!mapAsset)
        return;

    console.log("Deleting map asset:", id);

    // Clean up PIXI textures
    const destroyTexture = (texture: Texture | null) => {
        if (texture && !texture.destroyed)
            texture.destroy(true);
    };

    get(spriteAtomFamily(id)).then(destroyTexture).catch(console.error);
    get(textureAtomFamily(id)).then(destroyTexture).catch(console.error);

    // Release URL object(s)
    URL.revokeObjectURL(mapAsset.url);

    // Remove from map assets
    const mapAssets = get(mapAssetsAtom) || [];
    set(mapAssetsAtom, mapAssets.filter(asset => asset.id !== id));
});
deleteMapAssetAtom.debugLabel = "deleteMapAssetAtom";

export default function useDeleteMapAsset() {
    return useSetAtom(deleteMapAssetAtom);
}