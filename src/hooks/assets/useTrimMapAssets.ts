// Trim Assets
import {elementsAtom, spritesAtlasesAtom} from "../map/useMap";
import {mapAssetsAtom} from "./useMapAssets";
import {atom, useSetAtom} from "jotai";
import {deleteMapAssetAtom} from "./useDeleteMapAsset";

// Atom
export const trimAssetsAtom = atom(null, (get, set) => {
    const elements = get(elementsAtom);

    // Get All Used Asset IDs
    const spriteIDs = elements.map((e) => e.properties.spriteID);
    const meetingSpriteIDs = elements.map((e) => e.properties.meetingBackgroundID);
    const minigameIDs = elements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
    const soundIDs = elements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();
    const animationSpriteIDs = elements?.map((elem) => elem.properties.animation?.frames.map((frame) => frame.spriteID)).flat() ?? [];
    const usedAssetIDs = [...spriteIDs, ...meetingSpriteIDs, ...minigameIDs, ...soundIDs, ...animationSpriteIDs];

    // Remove Unused Sprite Atlases
    const spriteAtlases = get(spritesAtlasesAtom) || [];
    const filteredAtlases = spriteAtlases.filter((a) => usedAssetIDs.includes(a.id));
    set(spritesAtlasesAtom, filteredAtlases);

    // Add Sprite Atlas Asset IDs to Used IDs
    usedAssetIDs.push(...spriteAtlases.map((a) => a.assetID));

    // Remove Unused Assets
    const mapAssets = get(mapAssetsAtom) ?? [];
    const unusedAssets = mapAssets.filter((a) => !usedAssetIDs.includes(a.id));
    for (const asset of unusedAssets)
        set(deleteMapAssetAtom, asset.id); // <-- Runs cleanup

    // Return number of removed assets
    return unusedAssets.length;

});
trimAssetsAtom.debugLabel = "trimAssetsAtom";

// Hooks
export default function useTrimMapAssets() {
    return useSetAtom(trimAssetsAtom);
}