import LIMap from "../../../../types/li/LIMap";
import GUID from "../../../../types/common/GUID";
import parseAssetType from "../../../../utils/fileio/parseAssetType";
import store from "../../../../shared/store";
import {allAssetsAtom, MapAsset} from "@editor/assets/assetsStore";
import {convertMapToDocument} from "@editor/fileio/deserialization/convertMapToDocument";
import {MapDocument} from "@editor/document/types/MapDocument";

/**
 * Deserializes a .LIM2 file from an ArrayBuffer
 * @param buffer - The ArrayBuffer of the .LIM2 file
 * @param hasSignature - Whether the file has a 4-byte signature at the start
 * @returns The deserialized LIMap, or undefined if deserialization failed
 */
export default function deserializeLIMFile(buffer: ArrayBuffer, hasSignature?: boolean): MapDocument {
    const dataView = new DataView(buffer);
    const textDecoder = new TextDecoder("utf-8");

    // Get initial position
    let position = 0;
    if (hasSignature)
        position += 4; // Skip signature

    // Deserialize map JSON
    const jsonLength = dataView.getInt32(position, true);
    position += 4;

    const jsonString = textDecoder.decode(buffer.slice(position, position + jsonLength));
    position += jsonLength;

    const mapData = JSON.parse(jsonString) as LIMap;
    const allAssets: MapAsset[] = [];

    // Read Assets
    while (position < buffer.byteLength) {

        // Read GUID
        const guidSlice = buffer.slice(position, position + 36);
        const guid = textDecoder.decode(guidSlice) as GUID;
        position += 36;

        // Read Length
        const assetLength = dataView.getInt32(position, true);
        position += 4;

        // Check Length
        if (assetLength < 0)
            throw new Error(`Asset ${guid} has invalid length ${assetLength}`);

        // Read Asset
        const assetSlice = buffer.slice(position, position + assetLength);
        const assetType = parseAssetType(assetSlice);
        const assetBlob = new Blob([assetSlice], {type: assetType});
        const assetURL = URL.createObjectURL(assetBlob);
        allAssets.push({
            id: guid,
            type: assetType,
            blob: assetBlob,
            url: assetURL,
        });
        position += assetLength;
    }

    // TODO: Return the assets instead of storing them locally
    store.set(allAssetsAtom, [...allAssets]);
    return convertMapToDocument(mapData);
}