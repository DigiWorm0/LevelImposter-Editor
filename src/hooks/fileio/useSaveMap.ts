import { serializeMap } from "./useLISerializer";
import { mapAtom } from "../map/useMap";
import { isSavedAtom } from "./useIsSaved";
import { saveFileFromBlob } from "../../utils/fileio/saveFileFromURL";
import { atom, useSetAtom } from "jotai";

export const saveMapAtom = atom(null, async (get, set) => {
    const map = get(mapAtom);
    const mapData = await serializeMap(map);
    const blob = new Blob([mapData], { type: "application/levelimposter.map" });
    saveFileFromBlob(blob, `${map.name}.lim2`);
    set(isSavedAtom, true);
})

export default function useSaveMap() {
    return useSetAtom(saveMapAtom);
}