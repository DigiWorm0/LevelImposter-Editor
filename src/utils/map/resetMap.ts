import primaryStore from "../../hooks/primaryStore";
import {mapAtom} from "../../hooks/map/useMap";
import {DEFAULT_MAP} from "../../types/amongus/Constants";
import cleanupAsset from "../assets/cleanupAsset";

/**
 * This function resets the map to its initial state.
 * It cleanly disposes of any assets/textures associated with the current map.
 */
export default function resetMap() {
    const map = primaryStore.get(mapAtom);
    const mapAssets = map.assets || [];

    for (const asset of mapAssets)
        cleanupAsset(asset);

    primaryStore.set(mapAtom, {...DEFAULT_MAP});
}