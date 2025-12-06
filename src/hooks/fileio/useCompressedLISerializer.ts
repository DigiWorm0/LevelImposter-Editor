import React from "react";
import LIMap from "../../types/li/LIMap";
import useToaster from "../useToaster";
import GUID from "../../types/common/GUID";
import {zip} from "fflate";

export default function useCompressedLISerializer() {
    const toaster = useToaster();

    return React.useCallback(async (map: LIMap) => {
        try {
            return await serializeCompressedMap(map);
        } catch (error) {
            toaster.error("Failed to save map file.");
            console.error("Failed to serialize map", error);
            throw error;
        }
    }, []);
}

export async function serializeCompressedMap(map: LIMap): Promise<Uint8Array> {

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

// https://stackoverflow.com/questions/12271547/shouldnt-json-stringify-escape-unicode-characters
// Fixes unicode characters in JSON
function toUTF8(s: string) {
    return s.replace(/[^\x20-\x7F]/g, x => "\\u" + ("000" + x.codePointAt(0)?.toString(16)).slice(-4));
}