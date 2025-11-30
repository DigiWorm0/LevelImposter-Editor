// Trim Assets
import {elementsAtom} from "../map/useMap";
import {mapAssetsAtom} from "./useMapAssets";
import {atom, useSetAtom} from "jotai";

// Atom
export const trimAssetsAtom = atom(null, (get, set) => {
    const elements = get(elementsAtom);

    // Get All Used Asset IDs
    const spriteIDs = elements.map((e) => e.properties.spriteID);
    const meetingSpriteIDs = elements.map((e) => e.properties.meetingBackgroundID);
    const minigameIDs = elements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
    const soundIDs = elements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();
    const animationSpriteIDs = elements?.map((elem) => elem.properties.animation?.frames.map((frame) => frame.spriteID)).flat() ?? [];
    const assetIDs = [...spriteIDs, ...meetingSpriteIDs, ...minigameIDs, ...soundIDs, ...animationSpriteIDs];

    // Remove Unused Assets
    const mapAssets = get(mapAssetsAtom) ?? [];
    const filteredAssets = mapAssets.filter((a) => assetIDs.includes(a.id));
    set(mapAssetsAtom, filteredAssets);

    // Update Atom
    const trimAmount = mapAssets.length - filteredAssets.length;
    console.log(`Trimmed ${trimAmount} assets`);

    return trimAmount;

});
trimAssetsAtom.debugLabel = "trimAssetsAtom";

// Hooks
export default function useTrimMapAssets() {
    return useSetAtom(trimAssetsAtom);
}