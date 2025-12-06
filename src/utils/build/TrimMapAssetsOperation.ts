import BuildOperation from "./BuildOperation";
import primaryStore from "../../hooks/primaryStore";
import BuildOperationLog from "./BuildOperationLog";
import {trimAssetsAtom} from "../../hooks/assets/useTrimMapAssets";

const TrimMapAssetsOperation: BuildOperation = {
    async run() {
        // Save trimmed assets to store
        const totalTrimmedAssets = primaryStore.set(trimAssetsAtom);

        // Log result
        BuildOperationLog.success(`Trimmed ${totalTrimmedAssets} unused assets`);
    }
};

export default TrimMapAssetsOperation;