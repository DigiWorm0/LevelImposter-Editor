import {mapInfoFromIDAtom} from "@/hooks/firebase/useMapInfoFromID";
import {getDownloadURL, ref, StorageReference} from "firebase/storage";
import {storage} from "@/utils/Firebase";
import downloadFromURL from "@/utils/fileio/downloadFromURL";
import deserializeMapFile from "@editor/fileio/deserialization/deserializeMapFile";
import store from "@/shared/store";
import {setMap} from "@editor/history/setMap";

export const importMapFromID = async (
    id: string,
    onProgress?: (progress: number) => void
) => {

    // Get Storage Ref
    const metadata = await store.get(mapInfoFromIDAtom(id));
    const storageRef = ref(storage, `maps/${metadata.authorID}/${id}.lim2`);
    const legacyRef = ref(storage, `maps/${metadata.authorID}/${id}.lim`);

    // Deserialize
    const downloadMapFromRef = async (storageRef: StorageReference) => {
        const url = await getDownloadURL(storageRef);
        const bytes = await downloadFromURL(url, onProgress);
        const map = deserializeMapFile(bytes);

        setMap(map);
        return map;
    };

    // Download & Deserialize
    // Fallback to legacy if needed
    try {
        return await downloadMapFromRef(storageRef);
    } catch {
        return await downloadMapFromRef(legacyRef);
    }
};