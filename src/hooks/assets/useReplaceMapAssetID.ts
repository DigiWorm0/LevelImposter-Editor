import { atom, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { elementsAtom } from "../map/useMap";

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

    // Get Elements
    const elements = get(elementsAtom);
    const newElements = elements.map((element) => ({
        ...element,
        properties: {
            ...element.properties,
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
    return referenceCount;
});

export default function useReplaceMapAssetID() {
    return useSetAtom(replaceMapAssetIDAtom);
}