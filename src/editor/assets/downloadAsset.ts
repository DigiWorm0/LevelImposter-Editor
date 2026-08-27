import {mapAssetAsImageBlobAtomFamily} from "../../hooks/assets/useMapAssetAsImageBlob";
import saveFileFromURL from "../../utils/fileio/saveFileFromURL";
import store from "../../shared/store";
import {MaybeGUID} from "../../types/common/GUID";
import getFileExtension from "../../utils/fileio/getFileExtension";
import {assetsAtomFamily} from "../state/assetsStore";

export const downloadRawAsset = async (assetID: MaybeGUID, fileName?: string) => {
    // Get Asset
    const asset = store.get(assetsAtomFamily(assetID));
    if (!asset)
        return;

    // Download Asset
    const fileNameWithExtension = `${fileName ?? asset.id}.${getFileExtension(asset.type)}`;
    saveFileFromURL(asset.url, fileNameWithExtension);
};

export const downloadAssetAsPNG = async (assetID: MaybeGUID, fileName?: string) => {
    // Convert DDS to PNG
    const imageBlob = await store.get(mapAssetAsImageBlobAtomFamily(assetID));
    if (!imageBlob)
        return;

    // Download Asset
    const fileNameWithExtension = `${fileName ?? assetID}.png`;
    const fileURL = URL.createObjectURL(imageBlob);
    saveFileFromURL(fileURL, fileNameWithExtension);
    URL.revokeObjectURL(fileURL);
};