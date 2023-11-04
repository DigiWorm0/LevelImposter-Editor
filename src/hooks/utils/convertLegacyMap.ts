import LIMap from "../../types/li/LIMap";
import generateGUID from "./generateGUID";

export default function convertLegacyMap(mapData: LIMap) {
    mapData.assets = [];
    for (const element of mapData.elements) {
        // SpriteData
        if (element.properties.spriteData != undefined) {
            console.log(`Converting SpriteData of ${element.id}`);
            const id = generateGUID();
            const blob = base64ToBlob(element.properties.spriteData);
            mapData.assets.push({
                id,
                blob: blob,
                url: URL.createObjectURL(blob),
            });
            element.properties.spriteData = undefined;
            element.properties.spriteID = id;
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
                    const id = generateGUID();
                    const blob = base64ToBlob(sound.data);
                    mapData.assets.push({
                        id,
                        blob: blob,
                        url: URL.createObjectURL(blob),
                    });
                    sound.id = id;
                    sound.data = undefined;
                }
            }
        }

        // Minigames
        if (element.properties.minigames != undefined) {
            for (const minigame of element.properties.minigames) {
                if (minigame.spriteData != undefined) {
                    console.log(`Converting Minigame of ${minigame.id}`);
                    const id = generateGUID();
                    const blob = base64ToBlob(minigame.spriteData);
                    mapData.assets.push({
                        id,
                        blob: blob,
                        url: URL.createObjectURL(blob),
                    });
                    minigame.spriteData = undefined;
                    minigame.spriteID = id;
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
