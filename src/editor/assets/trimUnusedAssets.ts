import {deleteAsset} from "./deleteAsset";
import store from "../../shared/store";
import {allAssetsAtom} from "../state/assetsStore";
import {mapAtom} from "../state/documentStore";

export const trimUnusedAssets = () => {
    const map = store.get(mapAtom);
    const {elements, spriteAtlases} = map;

    // Get All Used Asset IDs
    const spriteIDs = elements.map((e) => e.properties.spriteID);
    const meetingSpriteIDs = elements.map((e) => e.properties.meetingBackgroundID);
    const minigameIDs = elements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
    const soundIDs = elements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();
    const animationSpriteIDs = elements?.map(elem =>
        elem.properties.animations?.map(anim =>
            anim.frames?.map(frame => frame.spriteID)).flat()
    ).flat() || [];

    const usedAssetIDs = [...spriteIDs, ...meetingSpriteIDs, ...minigameIDs, ...soundIDs, ...animationSpriteIDs];

    // Remove Unused Sprite Atlases
    // TODO: FIX ME!!!
    // map.spriteAtlases = map.spriteAtlases?.filter((a) => usedAssetIDs.includes(a.id));

    // Add Sprite Atlas Asset IDs to Used IDs
    usedAssetIDs.push(...spriteAtlases?.map((a) => a.assetID) || []);

    // Delete Unused Assets
    const allAssets = store.get(allAssetsAtom);
    const unusedAssets = allAssets?.filter((a) => !usedAssetIDs.includes(a.id)) ?? [];
    for (const asset of unusedAssets)
        deleteAsset(asset.id);

    // Return number of removed assets
    return unusedAssets.length;
};