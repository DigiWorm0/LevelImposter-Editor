// Trim Assets
import { atom } from "jotai/index";
import { elementsAtom } from "../map/useMap";
import { mapAssetsAtom } from "./useMapAssets";
import { useSetAtom } from "jotai";
import { saveHistoryAtom } from "../map/history/useHistory";

// Atom
export const trimAssetsAtom = atom(null, (get, set) => {
    const elements = get(elementsAtom);

    // Get All Used Asset IDs
    const spriteIDs = elements.map((e) => e.properties.spriteID);
    const meetingSpriteIDs = elements.map((e) => e.properties.meetingBackgroundID);
    const minigameIDs = elements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
    const soundIDs = elements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();
    const assetIDs = [...spriteIDs, ...meetingSpriteIDs, ...minigameIDs, ...soundIDs];

    // Remove Unused Assets
    const mapAssets = get(mapAssetsAtom) ?? [];
    const filteredAssets = mapAssets.filter((a) => assetIDs.includes(a.id));

    // Update Atom
    const trimAmount = mapAssets.length - filteredAssets.length;
    if (trimAmount > 0) {
        set(mapAssetsAtom, filteredAssets);
        set(saveHistoryAtom);
        console.log(`Trimmed ${trimAmount} assets`);
        return trimAmount;
    } else {
        console.log("No assets to trim");
        return 0;
    }

});
trimAssetsAtom.debugLabel = "trimAssetsAtom";

// Hooks
export default function useTrimMapAssets() {
    return useSetAtom(trimAssetsAtom);
}