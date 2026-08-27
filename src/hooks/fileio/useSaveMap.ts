import {mapAtom} from "../../editor/state/documentStore";
import {isSavedAtom} from "./useIsSaved";
import {saveFileFromBlob} from "../../utils/fileio/saveFileFromURL";
import {atom, useSetAtom} from "jotai";
import serializeLIMFile from "../../utils/serialization/serializeLIMFile";
import {trimUnusedAssets} from "../../editor/assets/trimUnusedAssets";

export const saveMapAtom = atom(null, async (get, set) => {
    // Trim Assets before save
    trimUnusedAssets();

    // Serialize Map
    const map = get(mapAtom);
    const mapData = await serializeLIMFile(map);

    // Save File Blob
    const blob = new Blob([mapData], {type: "application/levelimposter.map"});
    saveFileFromBlob(blob, `${map.name}.lim2`);

    // Set Saved
    set(isSavedAtom, true);
});

export default function useSaveMap() {
    return useSetAtom(saveMapAtom);
}