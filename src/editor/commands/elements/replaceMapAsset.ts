import {MapCommand} from "../../history/executeCommand";
import {MaybeGUID} from "../../../types/common/GUID";
import {deleteAsset} from "../../assets/deleteAsset";

// Return the number of references replaced by the last call to replaceMapAsset
export let replaceMapAssetReferenceCount = 0;

export const replaceMapAsset = (
    fromID: MaybeGUID,
    toID: MaybeGUID
): MapCommand => map => {

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
    for (const element of map.elements) {

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
    for (const atlas of map.spriteAtlases || [])
        atlas.assetID = checkID(atlas.assetID) || atlas.assetID;

    // Delete old asset
    deleteAsset(fromID);
};