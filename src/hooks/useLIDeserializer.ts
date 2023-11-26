import React from "react";
import LIMap from "../types/li/LIMap";
import GUID from "../types/generic/GUID";
import { useSetMap } from "./jotai/useMap";
import convertLegacyMap from "./utils/convertLegacyMap";
import { MAP_FORMAT_VER } from "../types/generic/Constants";
import { DEFAULT_GUID } from "./utils/generateGUID";
import { useSaveHistory } from "./jotai/useHistory";

export default function useLIDeserializer() {
    const setMap = useSetMap();
    const saveHistory = useSaveHistory();

    return React.useCallback((file: Blob) => {
        return new Promise<LIMap>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const result = reader.result as ArrayBuffer;
                    const byteView = new Uint8Array(result);

                    const firstByte = byteView[0];
                    const lastByte = byteView[byteView.length - 1];
                    const isLegacy = firstByte === '{'.charCodeAt(0) && lastByte === '}'.charCodeAt(0);

                    const mapData = isLegacy ? deserializeLegacy(result) : deserialize(result);
                    if (mapData === undefined) {
                        reject("Failed to deserialize file data");
                        return;
                    }
                    setMap(mapData);
                    saveHistory();
                    resolve(mapData);
                } catch (e) {
                    reject(e);
                }
            }
            reader.onerror = () => {
                reject(reader.error);
            }
            reader.readAsArrayBuffer(file);
        });
    }, []);
}

function deserializeLegacy(buffer: ArrayBuffer): LIMap | undefined {
    console.log("Deserializing LIM Map");
    const textDecoder = new TextDecoder();

    // Read JSON
    const jsonString = textDecoder.decode(buffer);
    const mapData = JSON.parse(jsonString) as LIMap;

    console.log(`JSON: ${jsonString.length} bytes`, mapData);

    // Convert
    convertLegacyMap(mapData);

    // Repair if needed
    repairMap(mapData);

    return mapData;
}

function deserialize(buffer: ArrayBuffer): LIMap | undefined {
    console.log("Deserializing LIM2 Map...");
    const dataView = new DataView(buffer);
    const textDecoder = new TextDecoder("utf-8");

    // Read JSON
    const jsonLength = dataView.getInt32(0, true);
    const jsonString = textDecoder.decode(buffer.slice(4, 4 + jsonLength));
    const mapData = JSON.parse(jsonString) as LIMap;
    mapData.assets = [];

    console.log(`JSON: ${jsonLength} bytes`, mapData);

    // Read Assets
    let position = 4 + jsonLength;
    while (position < buffer.byteLength) {
        // Read GUID
        let guidSlice = buffer.slice(position, position + 36);
        let guid = textDecoder.decode(guidSlice) as GUID;
        position += 36;

        // Read Length
        let assetLength = dataView.getInt32(position, true);
        position += 4;

        // Check Length
        if (assetLength < 0) {
            console.error(`Asset ${guid} has invalid length ${assetLength}`);
            return undefined;
        }

        console.log(`Asset ${guid}: ${assetLength} bytes`);

        // Read Asset
        const assetSlice = buffer.slice(position, position + assetLength);
        const assetType = parseAssetType(assetSlice);
        const assetBlob = new Blob([assetSlice], { type: assetType });
        const assetURL = URL.createObjectURL(assetBlob);
        mapData.assets.push({
            id: guid,
            blob: assetBlob,
            url: assetURL,
        });
        position += assetLength;

        console.log(`Asset ${guid} (${assetType}): ${assetURL}`);
    }

    // Repair if needed
    repairMap(mapData);

    return mapData;
}

function parseAssetType(asset: ArrayBuffer) {
    const textDecoder = new TextDecoder();

    const isGIF = asset.byteLength > 3 && textDecoder.decode(asset.slice(0, 3)) === "GIF";
    const isPNG = asset.byteLength > 8 && textDecoder.decode(asset.slice(1, 8)) === "PNG\r\n\x1a\n";
    const isJPEG = asset.byteLength > 2 && textDecoder.decode(asset.slice(0, 2)) === "\xff\xd8";
    const isWAV = asset.byteLength > 11 && textDecoder.decode(asset.slice(0, 11)) === "RIFF\x00\x00\x00\x00WAVEfmt ";

    if (isGIF) return "image/gif";
    if (isPNG) return "image/png";
    if (isJPEG) return "image/jpeg";
    if (isWAV) return "audio/wav";
    console.warn("Unknown asset type");
    return "application/octet-stream";
}

function repairMap(map: LIMap) {
    map.v = MAP_FORMAT_VER;
    map.id = map.id || DEFAULT_GUID;
    map.name = map.name || "";
    map.description = map.description || "";
    map.isPublic = map.isPublic || false;
    map.isVerified = map.isVerified || false;
    map.authorName = map.authorName || "";
    map.authorID = map.authorID || "";
    map.createdAt = map.createdAt || -1;
    map.elements = map.elements || [];
    map.properties = map.properties || {};
    map.remixOf = map.remixOf || null;
    if (map.remixOf === undefined)
        map.remixOf = null;
}
