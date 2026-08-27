import {getDownloadURL, ref, StorageReference} from "firebase/storage";
import GUID from "../../types/common/GUID";
import {storage} from "../../utils/Firebase";
import {mapAtom} from "../../editor/state/documentStore";
import downloadFromURL from "../../utils/fileio/downloadFromURL";
import {atom, useSetAtom} from "jotai";
import deserializeMapFile from "../../utils/deserialization/deserializeMapFile";
import {mapInfoFromIDAtom} from "./useMapInfoFromID";

export interface LoadMapFromIDPayload {
    id: GUID;
    onProgress?: (percent: number) => void;
}

export const loadMapFromIDAtom = atom(null, async (get, set, payload: LoadMapFromIDPayload) => {
    const {id, onProgress} = payload;

    // Get Storage Ref
    const metadata = await get(mapInfoFromIDAtom(id));
    const storageRef = ref(storage, `maps/${metadata.authorID}/${id}.lim2`);
    const legacyRef = ref(storage, `maps/${metadata.authorID}/${id}.lim`);

    // Deserialize
    const downloadMapFromRef = async (storageRef: StorageReference) => {
        const url = await getDownloadURL(storageRef);
        const bytes = await downloadFromURL(url, onProgress);
        const map = deserializeMapFile(bytes);

        set(mapAtom, map);
        return map;
    };

    // Download & Deserialize
    // Fallback to legacy if needed
    try {
        return await downloadMapFromRef(storageRef);
    } catch {
        return await downloadMapFromRef(legacyRef);
    }
});

export default function useLoadMapFromID() {
    return useSetAtom(loadMapFromIDAtom);
}