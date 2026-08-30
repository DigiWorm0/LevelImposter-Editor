import {getDownloadURL, ref, StorageReference, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "@/utils/Firebase";
import serializeCompressedLIMFile from "@editor/fileio/serialization/serializeCompressedLIMFile";
import {collection, doc, setDoc} from "firebase/firestore";
import store from "@/shared/store";
import {getI18n} from "react-i18next";
import {
    currentUserAtom,
    publishRemixIDAtom,
    publishTargetIDAtom,
    publishThumbnailAtom
} from "@editor/firebase/publish/publishStore";
import {documentAtom} from "@editor/document/documentStore";
import {MapProperties} from "@editor/document/types/MapProperties";
import {MapDocument} from "@editor/document/types/MapDocument";
import {EmptyGUID, generateGUID} from "@/shared/types/GUID";

const MAX_VALUE = 2147483647;

// Uploads a map and its thumbnail to Firebase Storage and posts its metadata to Firestore
export const publishMap = async (onProgress: (percent: number) => void) => {
    const map = store.get(documentAtom);
    const thumbnail = store.get(publishThumbnailAtom);

    checkUserPermissions();

    // Make local copy of map to modify properties before publishing
    const modifiedMap = {
        ...map,
        properties: getModifiedMapProperties(map.properties)
    };

    // Publish Files
    await uploadMapFile(modifiedMap, onProgress);
    if (thumbnail)
        modifiedMap.properties.thumbnailURL = await uploadMapThumbnail(
            modifiedMap.properties.id ?? EmptyGUID,
            thumbnail,
            onProgress
        );

    // Post Metadata
    await postMapMetadata(modifiedMap);
    return modifiedMap.properties.id ?? EmptyGUID;
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

const getModifiedMapProperties = (properties: MapProperties): MapProperties => {
    const user = store.get(currentUserAtom);
    const publishTargetID = store.get(publishTargetIDAtom);
    const remixID = store.get(publishRemixIDAtom);

    // TODO: Move targetID and remixID into document instead

    return {
        ...properties,
        id: publishTargetID ?? generateGUID(),
        idVersion: Math.round(Math.random() * MAX_VALUE),
        remixOf: remixID ?? undefined,
        authorID: user?.uid ?? "",
        authorName: properties.authorName || user?.displayName || "Anonymous",
        createdAt: new Date().getTime(),
        thumbnailURL: undefined,
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
    map: MapDocument,
    onProgress: (percent: number) => void
) => {
    const user = store.get(currentUserAtom);
    if (!user)
        throw new Error("User not logged in");

    const mapStorageRef = ref(storage, `maps/${user.uid}/${map.properties.id ?? EmptyGUID}.lim2`);
    const mapBytes = await serializeCompressedLIMFile(map);
    await uploadFileToStorage(mapStorageRef, mapBytes, onProgress);
};

// Posts the map metadata to Firestore
const postMapMetadata = async (map: MapProperties) => {
    // Collapse `LIMap` to `LIMetadata`
    // Removes unnecessary data from the map
    // const mapMetadata: LIMetadata = {
    //     v: map.v,
    //     id: map.id,
    //     idVersion: map.idVersion ?? null,
    //     name: map.name,
    //     description: map.description,
    //     isPublic: map.isPublic,
    //     authorID: map.authorID,
    //     authorName: map.authorName,
    //     createdAt: map.createdAt,
    //     thumbnailURL: map.thumbnailURL ?? null,
    //     remixOf: map.remixOf ?? null,
    //     likeCount: map.likeCount,
    //     downloadCount: map.downloadCount,
    //     isVerified: map.isVerified,
    //     mapTarget: map.mapTarget ?? null,
    // };

    // Upload to Firestore
    const storeRef = collection(db, "maps");
    const docRef = doc(storeRef, map.id);
    await setDoc(docRef, map);
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