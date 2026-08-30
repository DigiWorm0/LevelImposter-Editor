import {deleteAsset} from "./deleteAsset";
import store from "../../shared/store";
import {allAssetsAtom} from "./assetsStore";
import {docSpriteAtlasesAtom, documentAtom} from "../document/documentStore";

export const trimUnusedAssets = () => {
    const currentDocument = store.get(documentAtom);
    const allElements = Object.values(currentDocument.elements);

    // Get All Used Asset IDs
    const spriteIDs = allElements.map((e) => e.properties.spriteID);
    const meetingSpriteIDs = allElements.map((e) => e.properties.meetingBackgroundID);
    const minigameIDs = allElements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
    const soundIDs = allElements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();
    const animationSpriteIDs = allElements?.map(elem =>
        elem.properties.animations?.map(anim =>
            anim.frames?.map(frame => frame.spriteID)).flat()
    ).flat() || [];

    const usedAssetIDs = [...spriteIDs, ...meetingSpriteIDs, ...minigameIDs, ...soundIDs, ...animationSpriteIDs];

    // Remove Unused Sprite Atlases
    // TODO: FIX ME!!!
    // map.spriteAtlases = map.spriteAtlases?.filter((a) => usedAssetIDs.includes(a.id));

    // Add Sprite Atlas Asset IDs to Used IDs
    const spriteAtlases = store.get(docSpriteAtlasesAtom);
    const spriteAtlasAssetIDs = Object.values(spriteAtlases).map((a) => a.assetID);
    usedAssetIDs.push(...spriteAtlasAssetIDs);

    // Delete Unused Assets
    const allAssets = store.get(allAssetsAtom);
    const unusedAssets = allAssets?.filter((a) => !usedAssetIDs.includes(a.id)) ?? [];
    for (const asset of unusedAssets)
        deleteAsset(asset.id);

    // Return number of removed assets
    return unusedAssets.length;
};