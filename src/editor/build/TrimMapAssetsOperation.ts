import BuildOperation from "./BuildOperation";
import BuildOperationLog from "./BuildOperationLog";
import {trimUnusedAssets} from "../assets/trimUnusedAssets";

const TrimMapAssetsOperation: BuildOperation = {
    async run() {
        // Save trimmed assets to store
        const totalTrimmedAssets = trimUnusedAssets();

        // Log result
        BuildOperationLog.success(`Trimmed ${totalTrimmedAssets} unused assets`);
    }
};

export default TrimMapAssetsOperation;