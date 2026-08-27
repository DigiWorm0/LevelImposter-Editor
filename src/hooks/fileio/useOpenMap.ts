import {isSavedAtom} from "./useIsSaved";
import {mapAtom} from "../../editor/state/documentStore";
import {atom, useSetAtom} from "jotai";
import openUploadDialog from "../../utils/fileio/openUploadDialog";
import {deserializeMapFileFromBlob} from "../../utils/deserialization/deserializeMapFile";
import {SUPPORTED_MAP_FILE_TYPES} from "../../types/amongus/Constants";
import resetMap from "../../utils/map/resetMap";

export const openMapAtom = atom(null, async (_, set) => {
    const file = await openUploadDialog(SUPPORTED_MAP_FILE_TYPES.join(","));
    const map = await deserializeMapFileFromBlob(file);

    resetMap();
    set(isSavedAtom, true);
    set(mapAtom, map);

    return map;
});
openMapAtom.debugLabel = "openMapAtom";

export function useOpenMap() {
    return useSetAtom(openMapAtom);
}