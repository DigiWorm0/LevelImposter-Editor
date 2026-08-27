import LIMap from "../../../types/li/LIMap";
import convertOldLegacyMap from "../migrations/convertLegacyJSONMap";
import GUID from "../../../types/common/GUID";
import generateGUID from "../../strings/generateGUID";
import parseAssetType from "../../fileio/parseAssetType";
import checkForMapMigrations from "../migrations/checkForMapMigrations";
import MapAsset from "../../../types/li/MapAsset";
import store from "../../../shared/store";
import {allAssetsAtom} from "@editor/state/assetsStore";

/**
 * Deserializes a legacy .LIM/.JSON file from an ArrayBuffer
 * @param buffer - The ArrayBuffer of the .LIM file
 * @returns The deserialized LIMap
 */
export default function deserializeLegacyFile(buffer: ArrayBuffer): LIMap {

    // Deserialize JSON
    const textDecoder = new TextDecoder();
    const jsonString = textDecoder.decode(buffer);
    const mapData = JSON.parse(jsonString) as LIMap;

    // Convert Legacy Map
    convertLegacyMap(mapData);

    // Check for necessary migrations
    checkForMapMigrations(mapData);

    return mapData;
}

/**
 * Converts a legacy .LIM to .LIM2
 * @param mapData - .LIM Map Data
 */
function convertLegacyMap(mapData: LIMap) {

    // Check for .JSON file
    if ("objs" in mapData)
        convertOldLegacyMap(mapData);

    // Reset
    const allAssets: MapAsset[] = [];
    const duplicateDB: Record<string, GUID> = {};

    // Add Asset Function
    const addAsset = (base64: string): GUID => {
        // Check if already exists
        if (duplicateDB[base64] != undefined)
            return duplicateDB[base64];
        // Add Asset
        const id = generateGUID();
        const blob = base64ToBlob(base64);
        allAssets.push({
            id,
            blob: blob,
            url: URL.createObjectURL(blob),
            type: blob.type
        });
        duplicateDB[base64] = id;
        return id;
    };

    for (const element of mapData.elements) {

        // SpriteData
        if (element.properties.spriteData != undefined) {
            console.log(`Converting SpriteData of ${element.id}`);
            element.properties.spriteID = addAsset(element.properties.spriteData);
            element.properties.spriteData = undefined;
        }

        // Meeting Background
        if (element.properties.meetingBackground != undefined) {
            console.log(`Converting MeetingBackground of ${element.id}`);
            element.properties.meetingBackgroundID = addAsset(element.properties.meetingBackground);
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
                    sound.dataID = addAsset(sound.data);
                    sound.data = undefined;
                }
            }
        }

        // Minigames
        if (element.properties.minigames != undefined) {
            for (const minigame of element.properties.minigames) {
                if (minigame.spriteData != undefined) {
                    console.log(`Converting Minigame of ${minigame.id}`);
                    minigame.spriteID = addAsset(minigame.spriteData);
                    minigame.spriteData = undefined;
                }
            }
        }
    }

    // TODO: Return the assets instead of storing them locally
    store.set(allAssetsAtom, allAssets);
}

/**
 * Converts a base64 string to a Blob
 * @param base64 - The base64 string to convert
 * @returns The resulting Blob
 */
function base64ToBlob(base64: string) {
    const substring = base64.substring(base64.indexOf(",") + 1);
    const byteCharacters = atob(substring);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const type = parseAssetType(byteArray);
    return new Blob([byteArray], {type});
}
