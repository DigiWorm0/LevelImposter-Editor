// Trim Assets
import {atom} from "jotai/index";
import {mapAssetsAtom} from "./useMapAssets";
import {useSetAtom} from "jotai";
import {compareUInt8Arrays} from "../../utils/compareBlobs";
import {MaybeGUID} from "../../types/generic/GUID";
import {replaceMapAssetIDAtom} from "./useReplaceMapAssetID";
import {deleteMapAssetAtom} from "./useDeleteMapAsset";

interface TempAsset {
    id: MaybeGUID;
    data: Uint8Array;
}

// Atom
export const mergeAssetsAtom = atom(null, async (
    get,
    set,
    onProgress?: (percent: number, assetCount: number, referenceCount: number) => void
) => {

    // Get Assets
    const assets = get(mapAssetsAtom);
    if (!assets)
        return;

    // Iterate Assets
    const checkedAssets: TempAsset[] = [];
    let assetCount = 0;
    let referenceCount = 0;
    for (let i = 0; i < assets.length; i++) {
        // Progress
        if (onProgress)
            onProgress(i / assets.length, assetCount, referenceCount);

        // Read Asset
        const asset = assets[i];
        const arrayBuffer = await asset.blob.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        // Check for Existing Assets
        const existingAsset = checkedAssets.find((checkedAsset) => compareUInt8Arrays(data, checkedAsset.data));

        // No Duplicate Found
        if (existingAsset === undefined) {
            checkedAssets.push({id: asset.id, data});
            continue;
        }

        // Duplicate Found
        console.log(`  Duplicate asset found: ${asset.id} -> ${existingAsset.id}`);

        // Delete Duplicate
        assetCount++;
        referenceCount += set(replaceMapAssetIDAtom, {fromID: asset.id, toID: existingAsset.id});
        set(deleteMapAssetAtom, asset.id); // <-- This automatically saves the undo/redo history
    }

    // Return Count
    console.log(`Merged ${assetCount} assets with ${referenceCount} references`);
    return {assetCount, referenceCount};
});
mergeAssetsAtom.debugLabel = "mergeAssetsAtom";

// Hooks
export default function useMergeMapAssets() {
    return useSetAtom(mergeAssetsAtom);
}