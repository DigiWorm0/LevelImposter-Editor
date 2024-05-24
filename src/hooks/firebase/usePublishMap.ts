import { uploadMapAtom } from "./useUploadMap";
import generateGUID from "../../utils/generateGUID";
import { mapAtom } from "../map/useMap";
import { getI18n } from "react-i18next";
import { remixAtom } from "../map/useIsRemix";
import { atom, useSetAtom } from "jotai";
import { MaybeGUID } from "../../types/generic/GUID";
import { userAtom } from "./useUser";

export interface PublishMapPayload {
    thumbnail: Blob | null;
    id: MaybeGUID;
    onProgress: (percent: number) => void;
}

export const publishMapAtom = atom(null, (get, set, payload: PublishMapPayload) => {
    const map = get(mapAtom);
    const user = get(userAtom);
    const t = getI18n().t;

    // Check User Permissions
    if (!user)
        throw new Error(t("publish.errorNotLoggedIn"));
    if (!user.emailVerified)
        throw new Error(t("publish.errorEmailNotVerified"));

    // Get Map Data
    const isRemix = get(remixAtom);
    const oldMapID = map.id;

    // Update Properties
    map.id = payload.id ?? generateGUID();
    map.idVersion = (map.idVersion ?? 0) + 1;
    map.remixOf = isRemix ? oldMapID : null;

    map.idVersion = (map.idVersion ?? 0) + 1;
    map.authorID = user?.uid ?? "";
    map.authorName = map.authorName || user?.displayName || "Anonymous";
    map.createdAt = new Date().getTime();
    map.thumbnailURL = null

    map.isVerified = false;
    map.likeCount = 0;
    map.downloadCount = 0;

    // Upload Map
    return set(uploadMapAtom, {
        map,
        thumbnail: payload.thumbnail,
        onProgress: payload.onProgress
    });
});
publishMapAtom.debugLabel = "publishMapAtom";

export default function usePublishMap() {
    return useSetAtom(publishMapAtom);
}