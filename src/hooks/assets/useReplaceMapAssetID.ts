import {atom, useSetAtom} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";
import {elementsAtom, spritesAtlasesAtom} from "../map/useMap";
import {deleteMapAssetAtom} from "./useDeleteMapAsset";
import LIElement from "../../types/li/LIElement";

export interface ReplaceMapAssetIDPayload {
    fromID: MaybeGUID;
    toID: MaybeGUID;
}

export const replaceMapAssetIDAtom = atom(null, (get, set, payload: ReplaceMapAssetIDPayload) => {

    // Helper function to check asset ID
    let referenceCount = 0;
    const checkID = (value: MaybeGUID) => {
        if (value === payload.fromID) {
            referenceCount++;
            return payload.toID;
        }
        return value;
    };

    // Update Elements
    const elements = get(elementsAtom);
    const newElements: LIElement[] = elements.map((element) => ({
        ...element,
        properties: {
            ...element.properties,
            animation: element.properties.animation && {
                ...element.properties.animation,
                frames: element.properties.animation.frames.map((frame) => ({
                    ...frame,
                    spriteID: checkID(frame.spriteID) || frame.spriteID
                })) || []
            },
            spriteID: checkID(element.properties.spriteID),
            meetingBackgroundID: checkID(element.properties.meetingBackgroundID),
            minigames: element.properties.minigames?.map((minigame) => ({
                ...minigame,
                spriteID: checkID(minigame.spriteID)
            })),
            sounds: element.properties.sounds?.map((sound) => ({
                ...sound,
                dataID: checkID(sound.dataID)
            }))
        }
    }));
    set(elementsAtom, newElements);

    // Update Sprite Atlases
    const spriteAtlases = get(spritesAtlasesAtom) || [];
    const newSpriteAtlases = spriteAtlases.map((atlas) => ({
        ...atlas,
        assetID: checkID(atlas.assetID) || atlas.assetID
    }));
    set(spritesAtlasesAtom, newSpriteAtlases);

    // Delete old asset
    set(deleteMapAssetAtom, payload.fromID);

    return referenceCount;
});

export default function useReplaceMapAssetID() {
    return useSetAtom(replaceMapAssetIDAtom);
}