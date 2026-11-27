import openUploadDialog from "@shared/utils/openUploadDialog";
import {SUPPORTED_MAP_FILE_TYPES} from "@editor/fileio/supportedMapFileTypes";
import {deserializeMapFileFromBlob} from "@editor/fileio/deserialization/deserializeMapFile";
import {setDocument} from "@editor/history/setDocument";

export const openMapFromFileDialog = async () => {
    const file = await openUploadDialog(SUPPORTED_MAP_FILE_TYPES.join(","));
    const doc = await deserializeMapFileFromBlob(file);
    setDocument(doc);
    return doc;
};