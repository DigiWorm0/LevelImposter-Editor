import { atom, useSetAtom } from "jotai";
import GUID from "../../types/generic/GUID";
import { mapAssetsAtomFamily } from "./useMapAsset";
import getFileExtension from "../../utils/fileio/getFileExtension";
import openUploadDialog from "../../utils/fileio/openUploadDialog";
import { createMapAssetAtom } from "./useCreateMapAsset";
import { replaceMapAssetIDAtom } from "./useReplaceMapAssetID";
import { deleteMapAssetAtom } from "./useDeleteMapAsset";

export const replaceMapAssetAtom = atom(null, async (get, set, id: GUID) => {

    // Get Asset
    const asset = get(mapAssetsAtomFamily(id));
    if (!asset)
        return;

    // Get Asset Info
    const extension = getFileExtension(asset.blob.type);
    const file = await openUploadDialog(`.${extension}, *.*`);
    if (!file)
        return;

    // Create New Asset
    const newAsset = set(createMapAssetAtom, {
        type: asset.type,
        blob: file
    });

    // Replace Asset ID
    set(replaceMapAssetIDAtom, {
        fromID: id,
        toID: newAsset.id
    });

    // Delete Old Asset
    set(deleteMapAssetAtom, id);
});

export default function useReplaceMapAsset() {
    return useSetAtom(replaceMapAssetAtom);
}