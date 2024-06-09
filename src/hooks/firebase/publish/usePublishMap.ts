import { uploadMapAtom } from "../useUploadMap";
import generateGUID from "../../../utils/generateGUID";
import { mapAtom } from "../../map/useMap";
import { getI18n } from "react-i18next";
import { remixAtom } from "../../map/useIsRemix";
import { atom, useSetAtom } from "jotai";
import { userAtom } from "../useUser";
import { mapThumbnailAtom } from "./useMapThumbnail";
import { publishTargetAtom } from "./usePublishTarget";

export const publishMapAtom = atom(null, async (get, set, onProgress: (percent: number) => void) => {
    const map = get(mapAtom);
    const user = get(userAtom);
    const t = getI18n().t;

    // Check User Permissions
    if (!user)
        throw new Error(t("publish.errorNotLoggedIn"));
    if (!user.emailVerified)
        throw new Error(t("publish.errorEmailNotVerified"));

    // Get Map Data
    const thumbnail = get(mapThumbnailAtom);
    const targetID = get(publishTargetAtom);
    const isRemix = get(remixAtom);
    const oldMapID = map.id;

    // Update Properties
    map.id = targetID ?? generateGUID();
    map.idVersion = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    map.remixOf = isRemix ? oldMapID : null;

    map.authorID = user?.uid ?? "";
    map.authorName = map.authorName || user?.displayName || "Anonymous";
    map.createdAt = new Date().getTime();
    map.thumbnailURL = null

    map.isVerified = false;
    map.likeCount = 0;
    map.downloadCount = 0;

    // Upload Map
    return await set(uploadMapAtom, {
        map,
        thumbnail,
        onProgress
    });
});
publishMapAtom.debugLabel = "publishMapAtom";

export default function usePublishMap() {
    return useSetAtom(publishMapAtom);
}