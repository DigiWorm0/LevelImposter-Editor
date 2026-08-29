import {trimUnusedAssets} from "@editor/assets/trimUnusedAssets";
import serializeCompressedLIMFile from "@editor/fileio/serialization/serializeCompressedLIMFile";
import {isDocumentSavedAtom, mapAtom} from "@editor/state/documentStore";
import store from "@/shared/store";
import {downloadFileFromBlob} from "@editor/fileio/downloadFileFromURL";
import serializeLIMFile from "@editor/fileio/serialization/serializeLIMFile";

export const downloadMapFile = async (
    format: "standard" | "compressed" = "standard"
) => {
    // Trim Assets before save
    trimUnusedAssets();

    // Serialize Map
    const map = store.get(mapAtom);
    const mapData = format === "compressed"
        ? await serializeCompressedLIMFile(map)
        : await serializeLIMFile(map);

    // Save File Blob
    const blob = new Blob([mapData], {type: "application/levelimposter.map"});
    downloadFileFromBlob(blob, `${map.name}.lim2`);

    // Set Saved
    store.set(isDocumentSavedAtom, true);
}