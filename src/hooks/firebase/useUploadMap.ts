import LIMap from "../../types/li/LIMap";
import { db, storage } from "../../utils/Firebase";
import { getDownloadURL, ref, StorageReference, uploadBytesResumable } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import { serializeMap } from "../fileio/useLISerializer";
import LIMetadata from "../../types/li/LIMetadata";
import { atom, useSetAtom } from "jotai";
import { userAtom } from "./useUser";

export interface UploadMapPayload {
    map: LIMap;
    thumbnail: Blob | null;
    onProgress: (percent: number) => void;
}

export const uploadMapAtom = atom(null, (get, _, payload: UploadMapPayload) => {
    const { map, thumbnail, onProgress } = payload;
    const user = get(userAtom);

    // Uploads file to firebase storage
    const uploadFileToStorage = async (
        ref: StorageReference,
        data: Uint8Array | Blob | ArrayBuffer,
        onProgress: (percent: number) => void
    ) => {
        const uploadTask = uploadBytesResumable(ref, data, { cacheControl: "public, max-age=86400" });
        await new Promise<void>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                s => onProgress(s.bytesTransferred / s.totalBytes),
                reject,
                resolve
            );
        });
    };

    const upload = async (
        map: LIMap,
        thumbnail: Blob | null,
        onProgress: (percent: number) => void
    ) => {

        // Firebase Firestore
        const mapStorageRef = ref(storage, `maps/${user?.uid}/${map.id}.lim2`);

        // Upload Thumbnail
        if (thumbnail) {
            const storageRef = ref(storage, `maps/${user?.uid}/${map.id}.png`);
            await uploadFileToStorage(storageRef, thumbnail, onProgress);
            map.thumbnailURL = await getDownloadURL(storageRef);
        }

        // Serialize Map
        const mapBytes = await serializeMap(map);

        // Upload Map
        await uploadFileToStorage(mapStorageRef, mapBytes, onProgress);

        // Collapse `LIMap` to `LIMetadata`
        // Removes unnecessary data from the map
        const mapMetadata: LIMetadata = {
            v: map.v,
            id: map.id,
            idVersion: map.idVersion,
            name: map.name,
            description: map.description,
            isPublic: map.isPublic,
            authorID: map.authorID,
            authorName: map.authorName,
            createdAt: map.createdAt,
            thumbnailURL: map.thumbnailURL,
            remixOf: map.remixOf,
            likeCount: map.likeCount,
            downloadCount: map.downloadCount,
            isVerified: map.isVerified,
        };

        // Upload to Firestore
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, map.id);
        await setDoc(docRef, mapMetadata);

        return map.id;
    };

    return upload(map, thumbnail, onProgress);
});
uploadMapAtom.debugLabel = "uploadMapAtom";

export default function useUploadMap() {
    return useSetAtom(uploadMapAtom);
}