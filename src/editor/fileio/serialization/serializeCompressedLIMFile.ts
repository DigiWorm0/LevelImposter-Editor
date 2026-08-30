import GUID from "@shared/types/GUID";
import {zip} from "fflate";
import store from "../../../shared/store";
import {allAssetsAtom} from "@editor/assets/assetsStore";
import {convertDocumentToMap} from "@editor/fileio/serialization/convertDocumentToMap";
import {toUTF8} from "@/utils/strings/toUTF8";
import {MapDocument} from "@editor/document/types/MapDocument";

export default async function serializeCompressedLIMFile(doc: MapDocument): Promise<Uint8Array> {
    // Serialize JSON
    const map = convertDocumentToMap(doc);
    const jsonString = toUTF8(JSON.stringify({...map, assets: undefined}));
    const jsonData = new Uint8Array(jsonString.length);
    const textEncoder = new TextEncoder();
    textEncoder.encodeInto(jsonString, jsonData);

    // Serialize Assets
    const assets = store.get(allAssetsAtom); // TODO: Separate getter to get serializable assets
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