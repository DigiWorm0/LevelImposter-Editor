import GUID from "../../types/common/GUID";
import {zip} from "fflate";
import {toUTF8} from "../strings/toUTF8";
import LIMap from "../../types/li/LIMap";

export default async function serializeCompressedLIMFile(map: LIMap): Promise<Uint8Array> {
    // Serialize JSON
    const jsonString = toUTF8(JSON.stringify({...map, assets: undefined}));
    const jsonData = new Uint8Array(jsonString.length);
    const textEncoder = new TextEncoder();
    textEncoder.encodeInto(jsonString, jsonData);

    // Serialize Assets
    const assets = map.assets ?? [];
    const serializableAssets: Record<GUID, Uint8Array> = {};
    for (const asset of assets) {
        const arrayBuffer = await asset.blob.arrayBuffer();
        serializableAssets[asset.id] = new Uint8Array(arrayBuffer);
    }

    // Compress Data
    return await new Promise<Uint8Array>((resolve, reject) => {
        zip({
            "map.json": jsonData,
            ...serializableAssets
        }, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}