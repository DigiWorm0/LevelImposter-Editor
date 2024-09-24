import { atom, useSetAtom } from "jotai";
import MapAsset from "../../types/li/MapAsset";
import { mapAssetsAtom } from "./useMapAssets";
import generateGUID from "../../utils/strings/generateGUID";

// Payload
export interface CreateMapAssetPayload {
    type: "image" | "audio" | "unknown";
    blob: Blob;
}

// Atom
export const createMapAssetAtom = atom(null, (get, set, payload: CreateMapAssetPayload) => {
    const mapAssets = get(mapAssetsAtom) ?? [];
    const asset: MapAsset = {
        id: generateGUID(),
        type: payload.type,
        blob: payload.blob,
        url: URL.createObjectURL(payload.blob),
    };
    set(mapAssetsAtom, [...mapAssets, asset]);
    return asset;
});
createMapAssetAtom.debugLabel = "createMapAssetAtom";

// Hooks
export default function useCreateMapAsset() {
    return useSetAtom(createMapAssetAtom);
}