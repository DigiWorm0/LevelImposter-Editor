import BuildOperation from "./BuildOperation";
import GUID, {MaybeGUID} from "../../types/common/GUID";
import MapAsset from "../../types/li/MapAsset";
import primaryStore from "../../hooks/primaryStore";
import {mapAssetsAtom} from "../../hooks/assets/useMapAssets";
import {replaceMapAssetIDAtom} from "../../hooks/assets/useReplaceMapAssetID";
import BuildOperationLog from "./BuildOperationLog";

interface MergeCandidate {
    fromID: MaybeGUID;
    toID: MaybeGUID;
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
        const allAssets = primaryStore.get(mapAssetsAtom);
        if (!allAssets)
            throw new Error("No map assets found");

        // Get merge candidates
        const mergeCandidates = findMergeCandidates(allAssets);

        BuildOperationLog.info(`Found ${mergeCandidates.length} asset candidates to check`);

        // Only fetch data for assets that are part of merge candidates
        let mergeCandidateAssetIDs = mergeCandidates.flatMap(c => [c.fromID, c.toID]);
        mergeCandidateAssetIDs = Array.from(new Set(mergeCandidateAssetIDs)); // Deduplicate

        // Load asset data into memory
        const assetDataMap: Record<GUID, Uint8Array> = {};
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
            assetDataMap[asset.id] = new Uint8Array(await asset.blob.arrayBuffer());
        }

        // Log loaded asset data
        BuildOperationLog.info(`Loaded data for ${Object.keys(assetDataMap).length} assets`);

        // Run through candidates and find matches
        const replacedIDs = new Set<MaybeGUID>();
        let totalAssetsMerged = 0;
        for (let i = 0; i < mergeCandidates.length; i++) {
            // Log progress every 5 candidates
            if (i % 5 === 0)
                BuildOperationLog.info(`Comparing assets... (${i}/${mergeCandidates.length})`);

            // Skip if already replaced
            const candidate = mergeCandidates[i];
            if (replacedIDs.has(candidate.fromID) || replacedIDs.has(candidate.toID))
                continue;

            // Get asset data
            const fromData = assetDataMap[candidate.fromID!];
            const toData = assetDataMap[candidate.toID!];

            // Compare data
            const isMatch = compareArrayData(fromData, toData);

            // Wait a tick every 5 comparisons to keep UI responsive
            if (i % 5 === 0)
                await new Promise(requestAnimationFrame);

            // If matches, replace all references
            if (isMatch) {
                BuildOperationLog.info(`Merging asset ${candidate.fromID?.slice(0, 4)}... >>> ${candidate.toID?.slice(0, 4)}...`);
                totalAssetsMerged++;

                primaryStore.set(replaceMapAssetIDAtom, {
                    fromID: candidate.fromID,
                    toID: candidate.toID
                });

                replacedIDs.add(candidate.fromID);
            }
        }

        // Log result
        BuildOperationLog.success(`Merged ${totalAssetsMerged} assets`);
    }
};

export default MergeMapAssetsOperation;