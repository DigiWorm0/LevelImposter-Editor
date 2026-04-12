// Trim Assets
import {atom, useSetAtom} from "jotai";
import saveFileFromURL from "../../utils/fileio/saveFileFromURL";
import {mapAssetAsImageBlobAtomFamily} from "./useMapAssetAsImageBlob";
import {MaybeGUID} from "../../types/common/GUID";

export interface DownloadAssetPayload {
    id: MaybeGUID;
    fileName?: string;
}

// Atom
export const downloadMapAssetAsPNGAtom = atom(null, async (get, _, payload: DownloadAssetPayload) => {

    // Convert DDS to PNG
    const imageBlob = await get(mapAssetAsImageBlobAtomFamily(payload.id));
    if (!imageBlob)
        return;

    // Download Asset
    const fileName = `${payload.fileName ?? payload.id}.png`;
    const fileURL = URL.createObjectURL(imageBlob);
    saveFileFromURL(fileURL, fileName);
    URL.revokeObjectURL(fileURL);
});

// Hooks
export default function useDownloadMapAssetAsPNG() {
    return useSetAtom(downloadMapAssetAsPNGAtom);
}