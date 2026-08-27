import {mapAtom} from "@editor/state/documentStore";
import {DEFAULT_MAP} from "@/types/amongus/Constants";
import primaryStore from "@/shared/store";

/**
 * This function resets the map to its initial state.
 * It cleanly disposes of any assets/textures associated with the current map.
 */
export default function resetMap() {
    primaryStore.set(mapAtom, {...DEFAULT_MAP});
    // trimUnusedAssets();
}