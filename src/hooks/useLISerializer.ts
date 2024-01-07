import React from "react";
import LIMap from "../types/li/LIMap";
import useToaster from "./useToaster";

export default function useLISerializer() {
    const toaster = useToaster();

    return React.useCallback((map: LIMap) => {
        return serializeMap(map, toaster.warning);
    }, []);
}

async function serializeMap(map: LIMap, onError?: (error: string) => void) {
    const assets = map.assets ?? [];

    // Serialize JSON
    const jsonString = toUTF8(JSON.stringify({ ...map, assets: undefined }));
    const jsonLength = jsonString.length;

    console.log(`JSON: ${jsonLength} bytes`);

    // Create Data Array
    const dataSize = 4 + jsonLength + assets.reduce((acc, asset) => acc + 36 + 4 + asset.blob.size, 0);
    const rawData = new Uint8Array(dataSize);
    const dataView = new DataView(rawData.buffer);
    const textEncoder = new TextEncoder();

    console.log(`Total Data: ${dataSize} bytes`);

    // Write JSON
    dataView.setInt32(0, jsonLength, true);
    textEncoder.encodeInto(jsonString, rawData.subarray(4, 4 + jsonLength));

    // Write Assets
    let offset = 4 + jsonLength;
    for (const asset of assets) {
        console.log(`Asset: ${asset.id} (${asset.blob.size} bytes)`);

        // Write Asset ID
        for (let i = 0; i < 36; i++)
            rawData[offset + i] = asset.id.charCodeAt(i);
        offset += 36;

        // Write Asset Size
        const size = asset.blob.size;
        for (let i = 0; i < 4; i++)
            rawData[offset + i] = (size >> (i * 8)) & 0xff;
        offset += 4;

        // Write Asset Data
        try {
            const arrayBuffer = await asset.blob.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            for (let i = 0; i < size; i++)
                rawData[offset + i] = data[i];
        } catch (error: any) {
            if (onError)
                onError(`Warning: Failed to serialize asset ${asset.id}. One or more images/sounds may not be included in the map.`);
            console.warn(`Failed to serialize asset ${asset.id}`, error);
        }
        offset += size;
    }

    console.log(`Serialized: ${offset} bytes`, rawData);

    return rawData;
}

// https://stackoverflow.com/questions/12271547/shouldnt-json-stringify-escape-unicode-characters
// Fixes unicode characters in JSON
function toUTF8(s: string) {
    return s.replace(/[^\x20-\x7F]/g, x => "\\u" + ("000" + x.codePointAt(0)?.toString(16)).slice(-4))
}