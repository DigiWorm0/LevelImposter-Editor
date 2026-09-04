import React from "react";
import useToaster from "../toast/useToaster";
import {useTranslation} from "react-i18next";
import {importMapFromID} from "@editor/firebase/importMapFromID";
import {getMapIDFromURL, removeMapIDFromURL} from "@editor/url/getMapIDFromURL";

export default function useImportMapFromURL() {
    const toaster = useToaster();
    const {t} = useTranslation();

    React.useEffect(() => {
        const id = getMapIDFromURL();
        if (!id)
            return;

        const toastID = toaster.info(t("embed.loadingMap"));

        importMapFromID(id).then((map) => {
            removeMapIDFromURL();
            toaster.dismiss(toastID);
            toaster.success(t("embed.loadedMap", {
                name: map.name,
                author: map.properties.authorName ?? "Unknown"
            }));
        }).catch(toaster.error);
    }, []);

    return null;
}