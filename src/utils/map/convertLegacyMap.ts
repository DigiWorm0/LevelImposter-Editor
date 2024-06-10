import LIMap from "../../types/li/LIMap";
import generateGUID from "../strings/generateGUID";
import GUID from "../../types/generic/GUID";
import convertOldLegacyMap from "./convertOldLegacyMap";

/**
 * Converts .LIM to .LIM2
 * @param mapData - .LIM Map Data
 */
export default function convertLegacyMap(mapData: LIMap) {

    // Check for .JSON file
    if ("objs" in mapData)
        convertOldLegacyMap(mapData);

    // Reset
    mapData.assets = [];
    let duplicateDB: Record<string, GUID> = {};

    // Add Asset Function
    const addAsset = (base64: string, type: "image" | "audio"): GUID => {
        // Check if already exists
        if (duplicateDB[base64] != undefined)
            return duplicateDB[base64];
        // Add Asset
        const id = generateGUID();
        const blob = base64ToBlob(base64);
        mapData.assets?.push({
            id,
            blob: blob,
            url: URL.createObjectURL(blob),
            type
        });
        duplicateDB[base64] = id;
        return id;
    }

    for (const element of mapData.elements) {
        // SpriteData
        if (element.properties.spriteData != undefined) {
            console.log(`Converting SpriteData of ${element.id}`);
            element.properties.spriteID = addAsset(element.properties.spriteData, "image");
            element.properties.spriteData = undefined;
        }

        // Meeting Background
        if (element.properties.meetingBackground != undefined) {
            console.log(`Converting MeetingBackground of ${element.id}`);
            element.properties.meetingBackgroundID = addAsset(element.properties.meetingBackground, "image");
            element.properties.meetingBackground = undefined;
        }

        // Sound Data
        if (element.properties.sounds != undefined) {
            for (const sound of element.properties.sounds) {
                if (sound.data === undefined)
                    continue;
                console.log(`Converting Sound of ${sound.id}`);
                if (sound.isPreset) {
                    sound.presetID = sound.data;
                    sound.data = undefined;
                } else {
                    sound.dataID = addAsset(sound.data, "audio");
                    sound.data = undefined;
                }
            }
        }

        // Minigames
        if (element.properties.minigames != undefined) {
            for (const minigame of element.properties.minigames) {
                if (minigame.spriteData != undefined) {
                    console.log(`Converting Minigame of ${minigame.id}`);
                    minigame.spriteID = addAsset(minigame.spriteData, "image");
                    minigame.spriteData = undefined;
                }
            }
        }
    }
}

function base64ToBlob(base64: string) {
    const type = base64.substring(base64.indexOf(":") + 1, base64.indexOf(";"));
    const substring = base64.substring(base64.indexOf(",") + 1);
    const byteCharacters = atob(substring);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
}
