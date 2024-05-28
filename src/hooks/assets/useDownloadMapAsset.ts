// Trim Assets
import { atom } from "jotai/index";
import { useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { mapAssetsAtomFamily } from "./useMapAsset";
import saveFileFromURL from "../../utils/saveFileFromURL";
import getFileExtension from "../../utils/getFileExtension";

export interface DownloadAssetPayload {
    id: MaybeGUID;
    fileName?: string;
}

// Atom
export const downloadAssetAtom = atom(null, (get, _, payload: DownloadAssetPayload) => {

    // Get Asset
    const asset = get(mapAssetsAtomFamily(payload.id));
    if (!asset)
        return;

    // Download Asset
    const fileName = `${payload.fileName ?? asset.id}.${getFileExtension(asset.blob.type)}`;
    saveFileFromURL(asset.url, fileName);
});

// Hooks
export default function useDownloadMapAsset() {
    return useSetAtom(downloadAssetAtom);
}