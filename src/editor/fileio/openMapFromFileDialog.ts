import openUploadDialog from "@/utils/fileio/openUploadDialog";
import {SUPPORTED_MAP_FILE_TYPES} from "@/types/amongus/Constants";
import {deserializeMapFileFromBlob} from "@editor/fileio/deserialization/deserializeMapFile";
import {setDocument} from "@editor/history/setDocument";

export const openMapFromFileDialog = async () => {
    const file = await openUploadDialog(SUPPORTED_MAP_FILE_TYPES.join(","));
    const doc = await deserializeMapFileFromBlob(file);
    setDocument(doc);
    return doc;
};