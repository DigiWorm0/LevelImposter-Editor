import BuildOperation from "./BuildOperation";
import BuildOperationLog from "./BuildOperationLog";
import {convertImageAssetToDDS} from "@editor/assets/dds/convertImageToDDS";
import store from "../../shared/store";
import {allAssetsAtom} from "../assets/assetsStore";

const EncodeToDDSOperation: BuildOperation = {
    async run() {
        // Get list of map assets
        const allAssets = store.get(allAssetsAtom);
        if (!allAssets)
            throw new Error("No map assets found");

        // Filter by image assets
        const imageAssets = allAssets.filter((a) => a.type === "image/png" || a.type === "image/jpeg");
        BuildOperationLog.info(`Found ${imageAssets.length} PNG/JPEG assets to convert`);

        // Convert each image asset to DDS
        for (let i = 0; i < imageAssets.length; i++) {

            // Log progress
            BuildOperationLog.info(`Converting asset ${i + 1}/${imageAssets.length} to DDS...`);

            try {
                await convertImageAssetToDDS(imageAssets[i].id);
            } catch (e) {
                BuildOperationLog.warn(`Failed to convert an asset: ${(e as Error).message}`);
            }
        }

        // Log result
        BuildOperationLog.success(`Converted ${imageAssets.length} assets to DDS`);
    }
};

export default EncodeToDDSOperation;