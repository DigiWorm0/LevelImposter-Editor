import {documentAtom} from "@editor/document/documentStore";
import primaryStore from "@/shared/store";
import {createNewMapDocument} from "@editor/document/types/DefaultMapDocument";
import {trimUnusedAssets} from "@editor/assets/trimUnusedAssets";

/**
 * This function resets the map to its initial state.
 * It cleanly disposes of any assets/textures associated with the current map.
 */
export default function resetMap() {
    primaryStore.set(documentAtom, createNewMapDocument());
    trimUnusedAssets();
}