import {toUTF8} from "../../../utils/strings/toUTF8";
import store from "../../../shared/store";
import {allAssetsAtom} from "@editor/assets/assetsStore";
import {convertDocumentToMap} from "@editor/fileio/serialization/convertDocumentToMap";
import {MapDocument} from "@editor/document/types/MapDocument";

/**
 * Serializes a MapDocument to a LIM2 file format
 * @param doc - The MapDocument to serialize
 * @returns A promise that resolves to the serialized LIM2 file as a Uint8Array
 */
export default async function serializeLIMFile(doc: MapDocument): Promise<Uint8Array> {
    const assets = store.get(allAssetsAtom); // TODO: Separate getter to get serializable assets

    // Serialize JSON
    const map = convertDocumentToMap(doc);
    const jsonString = toUTF8(JSON.stringify({...map, assets: undefined}));
    const jsonLength = jsonString.length;

    // Create Data Array
    const dataSize = 4 + 4 + jsonLength + assets.reduce((acc, asset) => acc + 36 + 4 + asset.blob.size, 0);
    const rawData = new Uint8Array(dataSize);
    const dataView = new DataView(rawData.buffer);
    const textEncoder = new TextEncoder();

    // Write signature
    rawData[0] = 0x4C; // 'L'
    rawData[1] = 0x49; // 'I'
    rawData[2] = 0x4D; // 'M'
    rawData[3] = 0x32; // '2'

    // Write JSON
    dataView.setInt32(4, jsonLength, true);
    textEncoder.encodeInto(jsonString, rawData.subarray(8, 8 + jsonLength));

    // Write Assets
    let offset = 8 + jsonLength;
    for (const asset of assets) {

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
            console.warn(`Failed to serialize asset ${asset.id}`, error);
        }
        offset += size;
    }
    return rawData;
}