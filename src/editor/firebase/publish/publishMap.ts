import LIMetadata from "@/types/li/LIMetadata";
import {getDownloadURL, ref, StorageReference, uploadBytesResumable} from "firebase/storage";
import LIMap from "@/types/li/LIMap";
import {db, storage} from "@/utils/Firebase";
import serializeCompressedLIMFile from "@editor/fileio/serialization/serializeCompressedLIMFile";
import {collection, doc, setDoc} from "firebase/firestore";
import store from "@/shared/store";
import generateGUID from "@/utils/strings/generateGUID";
import {getI18n} from "react-i18next";
import {
    currentUserAtom,
    publishRemixIDAtom,
    publishTargetIDAtom,
    publishThumbnailAtom
} from "@editor/firebase/publish/publishStore";
import {mapAtom} from "@editor/documentStore";

const MAX_VALUE = 2147483647;

// Uploads a map and its thumbnail to Firebase Storage and posts its metadata to Firestore
export const publishMap = async (onProgress: (percent: number) => void) => {
    const map = store.get(mapAtom);
    const thumbnail = store.get(publishThumbnailAtom);

    checkUserPermissions();
    const modifiedMap = getModifiedMapData(map);

    // Publish Files
    await uploadMapFile(modifiedMap, onProgress);
    if (thumbnail)
        modifiedMap.thumbnailURL = await uploadMapThumbnail(
            modifiedMap.id,
            thumbnail,
            onProgress
        );

    // Post Metadata
    await postMapMetadata(modifiedMap);
    return modifiedMap.id;
};

const checkUserPermissions = () => {
    const currentUser = store.get(currentUserAtom);
    const t = getI18n().t;

    // Check User Permissions
    if (!currentUser)
        throw new Error(t("publish.errorNotLoggedIn"));
    if (!currentUser.emailVerified)
        throw new Error(t("publish.errorEmailNotVerified"));
};

const getModifiedMapData = (map: LIMap): LIMap => {
    const user = store.get(currentUserAtom);
    const publishTargetID = store.get(publishTargetIDAtom);
    const remixID = store.get(publishRemixIDAtom);

    // TODO: Move targetID and remixID into document instead

    return {
        ...map,
        id: publishTargetID ?? generateGUID(),
        idVersion: Math.round(Math.random() * MAX_VALUE),
        remixOf: remixID,
        authorID: user?.uid ?? "",
        authorName: map.authorName || user?.displayName || "Anonymous",
        createdAt: new Date().getTime(),
        thumbnailURL: null,
        isVerified: false,
        likeCount: 0,
        downloadCount: 0,
    };
};

// Uploads the map thumbnail to Firebase Storage
const uploadMapThumbnail = async (
    mapID: string,
    thumbnail: Blob,
    onProgress: (percent: number) => void
) => {
    const user = store.get(currentUserAtom);
    if (!user)
        throw new Error("User not logged in");

    const storageRef = ref(storage, `maps/${user.uid}/${mapID}.png`);
    await uploadFileToStorage(storageRef, thumbnail, onProgress);
    return await getDownloadURL(storageRef);
};

// Uploads the map file to Firebase Storage
const uploadMapFile = async (
    map: LIMap,
    onProgress: (percent: number) => void
) => {
    const user = store.get(currentUserAtom);
    if (!user)
        throw new Error("User not logged in");

    const mapStorageRef = ref(storage, `maps/${user.uid}/${map.id}.lim2`);
    const mapBytes = await serializeCompressedLIMFile(map);
    await uploadFileToStorage(mapStorageRef, mapBytes, onProgress);
};

// Posts the map metadata to Firestore
const postMapMetadata = async (map: LIMap) => {
    // Collapse `LIMap` to `LIMetadata`
    // Removes unnecessary data from the map
    const mapMetadata: LIMetadata = {
        v: map.v,
        id: map.id,
        idVersion: map.idVersion ?? null,
        name: map.name,
        description: map.description,
        isPublic: map.isPublic,
        authorID: map.authorID,
        authorName: map.authorName,
        createdAt: map.createdAt,
        thumbnailURL: map.thumbnailURL ?? null,
        remixOf: map.remixOf ?? null,
        likeCount: map.likeCount,
        downloadCount: map.downloadCount,
        isVerified: map.isVerified,
        mapTarget: map.mapTarget ?? null,
    };

    // Upload to Firestore
    const storeRef = collection(db, "maps");
    const docRef = doc(storeRef, map.id);
    await setDoc(docRef, mapMetadata);
};

// Uploads a file to Firebase Storage with progress tracking
const uploadFileToStorage = async (
    ref: StorageReference,
    data: Uint8Array | Blob | ArrayBuffer,
    onProgress: (percent: number) => void
) => {
    const uploadTask = uploadBytesResumable(ref, data, {cacheControl: "public, max-age=86400"});
    await new Promise<void>((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            s => onProgress(s.bytesTransferred / s.totalBytes),
            reject,
            resolve
        );
    });
};