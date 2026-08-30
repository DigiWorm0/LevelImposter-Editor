import {trimUnusedAssets} from "@editor/assets/trimUnusedAssets";
import serializeCompressedLIMFile from "@editor/fileio/serialization/serializeCompressedLIMFile";
import {documentAtom, isDocSavedAtom} from "@editor/document/documentStore";
import store from "@shared/store";
import {downloadFileFromBlob} from "@editor/fileio/download/downloadFileFromURL";
import serializeLIMFile from "@editor/fileio/serialization/serializeLIMFile";

export const downloadMapFile = async (
    format: "standard" | "compressed" = "standard"
) => {
    // Trim Assets before save
    trimUnusedAssets();

    // Serialize Map
    const document = store.get(documentAtom);
    const mapData = format === "compressed"
        ? await serializeCompressedLIMFile(document)
        : await serializeLIMFile(document);

    // Save File Blob
    const blob = new Blob([mapData], {type: "application/levelimposter.map"});
    downloadFileFromBlob(blob, `${document.name}.lim2`);

    // Set Saved
    store.set(isDocSavedAtom, true);
}