import openUploadDialog from "@/utils/fileio/openUploadDialog";
import {SUPPORTED_MAP_FILE_TYPES} from "@/types/amongus/Constants";
import {deserializeMapFileFromBlob} from "@editor/fileio/deserialization/deserializeMapFile";
import {setMap} from "@editor/history/setMap";

export const openMapFromFileDialog = async () => {
    const file = await openUploadDialog(SUPPORTED_MAP_FILE_TYPES.join(","));
    const map = await deserializeMapFileFromBlob(file);
    setMap(map);
    return map;
};