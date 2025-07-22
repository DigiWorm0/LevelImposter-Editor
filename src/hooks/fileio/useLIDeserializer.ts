import LIMap from "../../types/li/LIMap";
import GUID from "../../types/common/GUID";
import convertLegacyMap from "../../utils/map/convertLegacyMap";
import {MAP_FORMAT_VER} from "../../types/amongus/Constants";
import {DEFAULT_GUID} from "../../utils/strings/generateGUID";
import parseAssetType from "../../utils/fileio/parseAssetType";

export function deserializeMap(file: Blob) {
    return new Promise<LIMap>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const result = reader.result as ArrayBuffer;
                const byteView = new Uint8Array(result);

                const firstByte = byteView[0];
                const lastByte = byteView[byteView.length - 1];
                const isLegacy = firstByte === "{".charCodeAt(0) && lastByte === "}".charCodeAt(0);

                const mapData = isLegacy ? deserializeLegacy(result) : deserialize(result);
                if (mapData === undefined) {
                    reject("Failed to deserialize file data");
                    return;
                }
                resolve(mapData);
            } catch (e) {
                reject(e);
            }
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsArrayBuffer(file);
    });
}

function deserializeLegacy(buffer: ArrayBuffer): LIMap | undefined {
    console.log("Deserializing LIM Map");
    const textDecoder = new TextDecoder();

    // Read JSON
    const jsonString = textDecoder.decode(buffer);
    const mapData = JSON.parse(jsonString) as LIMap;

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

    // Read Assets
    let position = 4 + jsonLength;
    while (position < buffer.byteLength) {
        
        // Read GUID
        const guidSlice = buffer.slice(position, position + 36);
        const guid = textDecoder.decode(guidSlice) as GUID;
        position += 36;

        // Read Length
        const assetLength = dataView.getInt32(position, true);
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
        const assetBlob = new Blob([assetSlice], {type: assetType});
        const assetURL = URL.createObjectURL(assetBlob);
        mapData.assets.push({
            id: guid,
            type: assetType,
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

    // Find any layers at Z=maxInt and set them to Z=0
    for (const elem of map.elements) {
        if (elem.type === "util-layer" && elem.z >= Number.MAX_SAFE_INTEGER)
            elem.z = 0;
    }
}
