import {EditorCommand} from "../../history/executeCommand";
import {MaybeGUID} from "@shared/types/GUID";
import {deleteAsset} from "../../assets/deleteAsset";

// Return the number of references replaced by the last call to replaceMapAsset
export let replaceMapAssetReferenceCount = 0;

export const replaceMapAsset = (
    fromID: MaybeGUID,
    toID: MaybeGUID
): EditorCommand => map => {

    // Helper function to check asset ID
    replaceMapAssetReferenceCount = 0;
    const checkID = (value: MaybeGUID) => {
        if (value === fromID) {
            replaceMapAssetReferenceCount++;
            return toID;
        }
        return value;
    };

    // Iterate through all elements
    const allElements = Object.values(map.elements);
    for (const element of allElements) {

        // Update other properties
        element.properties.spriteID = checkID(element.properties.spriteID);
        element.properties.meetingBackgroundID = checkID(element.properties.meetingBackgroundID);

        // Minigames
        for (const minigame of element.properties.minigames || [])
            minigame.spriteID = checkID(minigame.spriteID);

        // Sounds
        for (const sound of element.properties.sounds || [])
            sound.dataID = checkID(sound.dataID);

        // Animations
        for (const animation of element.properties.animations || [])
            for (const frame of animation.frames)
                frame.spriteID = checkID(frame.spriteID) || frame.spriteID;
    }

    // Update Sprite Atlases
    const allSpriteAtlases = Object.values(map.spriteAtlases);
    for (const atlas of allSpriteAtlases)
        atlas.assetID = checkID(atlas.assetID) || atlas.assetID;

    // Delete old asset
    deleteAsset(fromID);
};