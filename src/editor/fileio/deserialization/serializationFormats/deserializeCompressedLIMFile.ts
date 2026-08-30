import LIMap from "../../../../types/li/LIMap";
import {unzipSync} from "fflate";
import GUID from "@shared/types/GUID";
import parseAssetType from "../../../../utils/fileio/parseAssetType";
import checkForMapMigrations from "../migrations/checkForMapMigrations";
import store from "../../../../shared/store";
import {allAssetsAtom, MapAsset} from "@editor/assets/assetsStore";
import {convertMapToDocument} from "@editor/fileio/deserialization/convertMapToDocument";
import {MapDocument} from "@editor/document/types/MapDocument";

const MAP_JSON_FILENAME = "map.json";

/**
 * Deserializes a compressed LIM2 file from an ArrayBuffer
 * @param buffer - The ArrayBuffer of the .LIM2 file
 * @returns The deserialized LIMap
 */
export default function deserializeCompressedLIMFile(buffer: ArrayBuffer): MapDocument {

    // Read Compressed Data
    const unzippedData = unzipSync(new Uint8Array(buffer));

    // Deserialize JSON
    const jsonBuffer = unzippedData[MAP_JSON_FILENAME];
    if (!jsonBuffer)
        throw new Error("Compressed LIM file is missing map.json");

    const textDecoder = new TextDecoder();
    const jsonString = textDecoder.decode(jsonBuffer);
    const mapData = JSON.parse(jsonString) as LIMap;
    const mapDocument = convertMapToDocument(mapData);

    // Read Assets
    const allAssets: MapAsset[] = [];
    const assetIDs = Object.keys(unzippedData);
    for (const assetID of assetIDs) {
        // Skip map.json
        if (assetID === MAP_JSON_FILENAME)
            continue;

        const assetBuffer = unzippedData[assetID];
        if (!assetBuffer)
            continue;

        // Create Map Asset in AssetDB
        const assetType = parseAssetType(assetBuffer);
        const assetBlob = new Blob([assetBuffer], {type: assetType});
        const assetURL = URL.createObjectURL(assetBlob);
        allAssets.push({
            id: assetID as GUID,
            type: assetType,
            blob: assetBlob,
            url: assetURL,
        });
    }

    // Check for necessary migrations
    checkForMapMigrations(mapData);

    // TODO: Return the assets instead of storing them locally
    store.set(allAssetsAtom, allAssets);

    return mapDocument;
}