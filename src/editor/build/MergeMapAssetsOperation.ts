import BuildOperationLog from "./BuildOperationLog";
import GUID, {MaybeGUID} from "../../types/common/GUID";
import BuildOperation from "./BuildOperation";
import {allAssetsAtom, MapAsset} from "../assets/assetsStore";
import executeCommand from "../history/executeCommand";
import {replaceMapAsset} from "@editor/elements/replaceMapAsset";
import primaryStore from "@/shared/store";

interface MergeCandidate {
    fromID: MaybeGUID;
    toID: MaybeGUID;
}

interface AssetData {
    id: GUID;
    data: Uint8Array;
}

/**
 * Compares two Uint8Array objects for equality.
 * @param dataA - First array to compare
 * @param dataB - Second array to compare
 * @return True if arrays are equal, false otherwise
 * @private
 */
function compareArrayData(dataA: Uint8Array, dataB: Uint8Array) {
    if (dataA.length !== dataB.length)
        return false;
    for (let i = 0; i < dataA.length; i++)
        if (dataA[i] !== dataB[i])
            return false;
    return true;
}

/**
 * Quickly searches an array of assets to find candidates
 * that may be able merge-able.
 * @param assets - List of assets to search
 * @returns List of candidates that may be merge-able
 * @private
 */
function findMergeCandidates(assets: MapAsset[]) {
    const allMergeCandidates: MergeCandidate[] = [];

    // Iterate through "from" assets
    for (let i = 0; i < assets.length; i++) {

        // Iterate through "to" assets
        for (let o = i + 1; o < assets.length; o++) {

            // Check to see if sizes match
            if (assets[i].blob.size === assets[o].blob.size) {

                // Add merge candidates
                allMergeCandidates.push({
                    fromID: assets[i].id,
                    toID: assets[o].id
                });

            }
        }
    }

    return allMergeCandidates;
}

const MergeMapAssetsOperation: BuildOperation = {
    async run() {

        // Get list of map assets
        const allAssets = primaryStore.get(allAssetsAtom);
        if (!allAssets)
            throw new Error("No map assets found");

        // Get merge candidates
        const mergeCandidates = findMergeCandidates(allAssets);


        // Only fetch data for assets that are part of merge candidates
        let mergeCandidateAssetIDs = mergeCandidates.flatMap(c => [c.fromID, c.toID]);
        mergeCandidateAssetIDs = Array.from(new Set(mergeCandidateAssetIDs)); // Deduplicate

        BuildOperationLog.info(`Found ${mergeCandidateAssetIDs.length} asset candidates to check`);

        // Load asset data into memory
        const assetDataList: AssetData[] = [];
        for (let i = 0; i < mergeCandidateAssetIDs.length; i++) {
            // Log progress every 10 assets
            if (i % 10 === 0)
                BuildOperationLog.info(`Loading asset data... (${i}/${mergeCandidateAssetIDs.length})`);

            // Find asset by ID
            const assetID = mergeCandidateAssetIDs[i];
            const asset = allAssets.find(a => a.id === assetID);
            if (!asset) {
                BuildOperationLog.error(`Asset not found: ${assetID}`);
                continue;
            }

            // Load asset data
            assetDataList.push({
                id: asset.id,
                data: new Uint8Array(await asset.blob.arrayBuffer())
            });
        }

        // Sort asset data sequentially by data to improve comparison speed
        // This is faster than comparing every asset to every other asset
        // This takes it from O(n^2) to O(n log n)
        BuildOperationLog.info(`Sorting ${assetDataList.length} assets...`);
        assetDataList.sort((a, b) => {
            if (a.data.length !== b.data.length)
                return a.data.length - b.data.length;
            for (let i = 0; i < a.data.length; i++) {
                if (a.data[i] !== b.data[i])
                    return a.data[i] - b.data[i];
            }
            return 0;
        });

        // Go through sorted asset data and find matches
        let totalAssetsMerged = 0;
        for (let i = 0; i < assetDataList.length - 1; i++) {

            // Get candidate
            const from = assetDataList[i];
            const to = assetDataList[i + 1];

            // Log progress every 5 candidates
            if (i % 5 === 0)
                BuildOperationLog.info(`Comparing candidates... (${i}/${assetDataList.length})`);

            // Compare data with next asset in sorted list
            const isMatch = compareArrayData(from.data, to.data);

            // If matches, replace all references
            if (isMatch) {
                BuildOperationLog.info(`Merging asset ${from.id.slice(0, 4)}... >>> ${to.id.slice(0, 4)}...`);
                totalAssetsMerged++;

                // TODO: Maybe batch these into a single command to avoid multiple history entries?
                executeCommand(replaceMapAsset(
                    from.id,
                    to.id
                ));
            }
        }

        // Log result
        BuildOperationLog.success(`Merged ${totalAssetsMerged} assets`);
    }
};

export default MergeMapAssetsOperation;