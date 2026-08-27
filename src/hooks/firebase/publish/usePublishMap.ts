import {uploadMapAtom} from "../useUploadMap";
import generateGUID from "../../../utils/strings/generateGUID";
import {mapAtom} from "../../../editor/state/documentStore";
import {getI18n} from "react-i18next";
import {atom, useSetAtom} from "jotai";
import {userAtom} from "../useUser";
import {mapThumbnailAtom} from "./useMapThumbnail";
import {publishTargetAtom} from "./usePublishTarget";
import {currentRemixIDAtom} from "../../map/useCurrentRemixID";

const MAX_VALUE = 2147483647;

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
    const remixID = get(currentRemixIDAtom);

    // Update Properties
    map.id = targetID ?? generateGUID();
    map.idVersion = Math.round(Math.random() * MAX_VALUE);
    map.remixOf = remixID;

    map.authorID = user?.uid ?? "";
    map.authorName = map.authorName || user?.displayName || "Anonymous";
    map.createdAt = new Date().getTime();
    map.thumbnailURL = null;

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