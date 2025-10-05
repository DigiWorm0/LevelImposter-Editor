import BuildOperation from "./BuildOperation";
import primaryStore from "../../hooks/primaryStore";
import {mapAssetsAtom} from "../../hooks/assets/useMapAssets";
import BuildOperationLog from "./BuildOperationLog";
import convertImageToDDS from "../dds/convertImageToDDS";
import {imageAtomFamily} from "../../hooks/canvas/legacy/useImage";
import {createMapAssetAtom} from "../../hooks/assets/useCreateMapAsset";
import {replaceMapAssetIDAtom} from "../../hooks/assets/useReplaceMapAssetID";

const EncodeToDDSOperation: BuildOperation = {
    async run() {
        // Get list of map assets
        const allAssets = primaryStore.get(mapAssetsAtom);
        if (!allAssets)
            throw new Error("No map assets found");

        // Filter by image assets
        const imageAssets = allAssets.filter((a) => a.type === "image/png" || a.type === "image/jpeg");
        BuildOperationLog.info(`Found ${imageAssets.length} PNG/JPEG assets to convert`);

        // Convert each image asset to DDS
        for (let i = 0; i < imageAssets.length; i++) {

            // Log progress
            BuildOperationLog.info(`Converting asset ${i + 1}/${imageAssets.length} to DDS...`);

            // Get Image from Asset
            const asset = imageAssets[i];
            const image = await primaryStore.get(imageAtomFamily(asset.url));

            // Convert to DDS
            const blob = await convertImageToDDS(image);

            // Create new asset
            const newMapAsset = primaryStore.set(createMapAssetAtom, {
                type: "image/dds",
                blob
            });

            // Replace all instances of the old asset with new one
            primaryStore.set(replaceMapAssetIDAtom, {
                fromID: asset.id,
                toID: newMapAsset.id
            });
        }

        // Log result
        BuildOperationLog.success(`Converted ${imageAssets.length} assets to DDS`);
    }
};

export default EncodeToDDSOperation;