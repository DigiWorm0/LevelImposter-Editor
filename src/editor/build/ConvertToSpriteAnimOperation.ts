import BuildOperation from "./BuildOperation";
import BuildOperationLog from "./BuildOperationLog";
import {convertGIFAssetToSpriteAnim} from "@editor/assets/animations/convertGIFToSpriteAnimation";
import store from "../../shared/store";
import {allAssetsAtom} from "../assets/assetsStore";

const ConvertToSpriteAnimOperation: BuildOperation = {
    async run() {
        // Get list of map assets
        const allAssets = store.get(allAssetsAtom);
        if (!allAssets)
            throw new Error("No map assets found");

        // Filter by GIF assets
        const gifAssets = allAssets.filter((a) => a.type === "image/gif");
        BuildOperationLog.info(`Found ${gifAssets.length} GIF animations to convert`);

        // Convert each gif asset to a Sprite Animation
        for (let i = 0; i < gifAssets.length; i++) {

            // Log progress
            BuildOperationLog.info(`Converting asset ${i + 1}/${gifAssets.length} to Sprite Animation...`);

            try {
                await convertGIFAssetToSpriteAnim(gifAssets[i].id);
            } catch (e) {
                BuildOperationLog.warn(`Failed to convert an asset: ${(e as Error).message}`);
            }
        }

        // Log result
        BuildOperationLog.success(`Converted ${gifAssets.length} assets to DDS`);
    }
};

export default ConvertToSpriteAnimOperation;