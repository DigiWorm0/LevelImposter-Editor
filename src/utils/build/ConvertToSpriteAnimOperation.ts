import BuildOperation from "./BuildOperation";
import primaryStore from "../../hooks/primaryStore";
import {mapAssetsAtom} from "../../hooks/assets/useMapAssets";
import BuildOperationLog from "./BuildOperationLog";
import {convertGIFAssetToSpriteAnim} from "../gif/convertGIFToSpriteAnimation";

const ConvertToSpriteAnimOperation: BuildOperation = {
    async run() {
        // Get list of map assets
        const allAssets = primaryStore.get(mapAssetsAtom);
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