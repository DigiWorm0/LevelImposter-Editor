import useUploadMap from "./useUploadMap";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/Firebase";
import generateGUID from "../../utils/generateGUID";
import { useMapValue } from "../map/useMap";
import { useTranslation } from "react-i18next";

export default function usePublishMap() {
    const { t } = useTranslation();
    const map = useMapValue();
    const uploadMap = useUploadMap();
    const [user] = useAuthState(auth);

    return React.useCallback(async (
        thumbnail: Blob | null,
        isNewPublish: boolean,
        onProgress: (percent: number) => void,
    ) => {
        // Check User Permissions
        if (!user)
            return Promise.reject(new Error(t("publish.errorNotLoggedIn")));
        if (!user.emailVerified)
            return Promise.reject(new Error(t("publish.errorEmailNotVerified")));

        // Reset ID on New Publish
        if (isNewPublish) {
            const isRemix = map.authorID !== user?.uid && map.authorID !== "";
            const oldMapID = map.id;
            map.id = generateGUID();
            map.remixOf = isRemix ? oldMapID : null;
        }

        // Update Properties
        map.idVersion = (map.idVersion ?? 0) + 1;
        map.authorID = user?.uid ?? "";
        map.authorName = map.authorName || user?.displayName || "Anonymous";
        map.createdAt = new Date().getTime();
        map.thumbnailURL = null

        map.isVerified = false;
        map.likeCount = 0;
        map.downloadCount = 0;

        // Upload Map
        return await uploadMap(map, thumbnail, onProgress);
    }, [map, uploadMap, user, t]);
}