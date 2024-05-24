import { saveHistoryAtom } from "../map/useHistory";
import { isSavedAtom } from "./useIsSaved";
import { deserializeMap } from "./useLIDeserializer";
import { mapAtom } from "../map/useMap";
import { atom, useSetAtom } from "jotai";
import openUploadDialog from "../../utils/openUploadDialog";

export const openMapAtom = atom(null, async (_, set) => {
    const file = await openUploadDialog(".lim, .lim2, .json");
    const map = await deserializeMap(file);

    set(isSavedAtom, true);
    set(mapAtom, map);
    set(saveHistoryAtom);
});
openMapAtom.debugLabel = "openMapAtom";

export function useOpenMap() {
    return useSetAtom(openMapAtom);
}