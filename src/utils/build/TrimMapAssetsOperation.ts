import BuildOperation from "./BuildOperation";
import primaryStore from "../../hooks/primaryStore";
import {mapAssetsAtom} from "../../hooks/assets/useMapAssets";
import {elementsAtom} from "../../hooks/map/useMap";
import BuildOperationLog from "./BuildOperationLog";

const TrimMapAssetsOperation: BuildOperation = {
    async run() {
        // Get list of map assets
        const allAssets = primaryStore.get(mapAssetsAtom);
        if (!allAssets)
            throw new Error("No map assets found");

        // Get map data
        const allElements = primaryStore.get(elementsAtom);
        if (!allElements)
            throw new Error("No map elements found");

        // Get All Used Asset IDs
        const spriteIDs = allElements.map((e) => e.properties.spriteID);
        const meetingSpriteIDs = allElements.map((e) => e.properties.meetingBackgroundID);
        const minigameIDs = allElements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
        const soundIDs = allElements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();

        const usedAssetIDs = [...spriteIDs, ...meetingSpriteIDs, ...minigameIDs, ...soundIDs];

        // Filter by used assets
        const usedAssets = allAssets.filter((a) => usedAssetIDs.includes(a.id));

        // Save trimmed assets to store
        primaryStore.set(mapAssetsAtom, usedAssets);

        // Log result
        BuildOperationLog.success(`Trimmed ${allAssets.length - usedAssets.length} unused assets`);
    }
};

export default TrimMapAssetsOperation;