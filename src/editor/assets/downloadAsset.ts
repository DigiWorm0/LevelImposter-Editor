import {mapAssetAsImageBlobAtomFamily} from "@/hooks/assets/useMapAssetAsImageBlob";
import downloadFileFromURL from "../fileio/download/downloadFileFromURL";
import store from "../../shared/store";
import {MaybeGUID} from "@/shared/types/GUID";
import assetTypeToFileExtension from "./assetTypeToFileExtension";
import {assetsAtomFamily} from "./assetsStore";

export const downloadRawAsset = async (assetID: MaybeGUID, fileName?: string) => {
    // Get Asset
    const asset = store.get(assetsAtomFamily(assetID));
    if (!asset)
        return;

    // Download Asset
    const fileNameWithExtension = `${fileName ?? asset.id}.${assetTypeToFileExtension(asset.type)}`;
    downloadFileFromURL(asset.url, fileNameWithExtension);
};

export const downloadAssetAsPNG = async (assetID: MaybeGUID, fileName?: string) => {
    // Convert DDS to PNG
    const imageBlob = await store.get(mapAssetAsImageBlobAtomFamily(assetID));
    if (!imageBlob)
        return;

    // Download Asset
    const fileNameWithExtension = `${fileName ?? assetID}.png`;
    const fileURL = URL.createObjectURL(imageBlob);
    downloadFileFromURL(fileURL, fileNameWithExtension);
    URL.revokeObjectURL(fileURL);
};