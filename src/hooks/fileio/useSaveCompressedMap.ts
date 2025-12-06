import {mapAtom} from "../map/useMap";
import {isSavedAtom} from "./useIsSaved";
import {saveFileFromBlob} from "../../utils/fileio/saveFileFromURL";
import {atom, useSetAtom} from "jotai";
import {trimAssetsAtom} from "../assets/useTrimMapAssets";
import serializeCompressedLIMFile from "../../utils/serialization/serializeCompressedLIMFile";

export const saveCompressedMapAtom = atom(null, async (get, set) => {
    // Trim Assets before save
    set(trimAssetsAtom);

    // Serialize Map
    const map = get(mapAtom);
    const mapData = await serializeCompressedLIMFile(map);

    // Save File Blob
    const blob = new Blob([mapData], {type: "application/levelimposter.map"});
    saveFileFromBlob(blob, `${map.name}.lim2`);

    // Set Saved
    set(isSavedAtom, true);
});

export default function useSaveCompressedMap() {
    return useSetAtom(saveCompressedMapAtom);
}