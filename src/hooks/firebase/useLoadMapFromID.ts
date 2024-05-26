import { collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import GUID from "../../types/generic/GUID";
import LIMetadata from "../../types/li/LIMetadata";
import { db, storage } from "../../utils/Firebase";
import { deserializeMap } from "../fileio/useLIDeserializer";
import { mapAtom } from "../map/useMap";
import downloadFromURL from "../../utils/downloadFromURL";
import { atom, useSetAtom } from "jotai";

export interface LoadMapFromIDPayload {
    id: GUID;
    onProgress?: (percent: number) => void;
}

export const loadMapFromIDAtom = atom(null, async (_, set, payload: LoadMapFromIDPayload) => {
    const { id, onProgress } = payload;

    // Get Firebase Refs
    const storeRef = collection(db, "maps");
    const docRef = doc(storeRef, id);

    // Get Document
    const document = await getDoc(docRef);
    if (!document.exists())
        throw new Error("Map ID not found");

    // Get Storage Ref
    const metadata = document.data() as LIMetadata;
    const storageRef = ref(storage, `maps/${metadata.authorID}/${id}.lim2`);
    const legacyRef = ref(storage, `maps/${metadata.authorID}/${id}.lim`);

    // Deserialize
    const downloadMapFromRef = async (storageRef: StorageReference) => {
        const url = await getDownloadURL(storageRef);
        const bytes = await downloadFromURL(url, onProgress);
        const blob = new Blob([bytes], { type: "application/json" });
        const map = await deserializeMap(blob);

        set(mapAtom, map);
        return map;
    }

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