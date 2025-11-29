import {MaybeGUID} from "../../types/common/GUID";
import MapAsset from "../../types/li/MapAsset";
import primaryStore from "../../hooks/primaryStore";
import {mapAssetsAtom} from "../../hooks/assets/useMapAssets";

export default function mergeMapAssets() {
    const allAssets = primaryStore.get(mapAssetsAtom);
    // if (!allAssets)
    // throw new Error(
    // const mergeCandidates = findAssetsWithEqualSize(allAssets);
}


interface MergeCandidate {
    fromID: MaybeGUID;
    toID: MaybeGUID;
}


function findAssetsWithEqualSize(assets: MapAsset[]) {
    const allMergeCandidates: MergeCandidate[] = [];

    // Iterate through every combination of 2 assets
    for (let i = 0; i < assets.length; i++)
        for (let o = i + 1; o < assets.length; o++)

            // Check to see if sizes match
            if (assets[i].blob.size === assets[o].blob.size)

                // Add merge candidates
                allMergeCandidates.push({
                    fromID: assets[i].id,
                    toID: assets[o].id
                });

    return allMergeCandidates;
}