import React from "react";
import GUID from "../../types/common/GUID";
import useToaster from "../useToaster";
import {useTranslation} from "react-i18next";
import {importMapFromID} from "@editor/firebase/importMapFromID";

export default function useIDParam() {
    const toaster = useToaster();
    const {t} = useTranslation();

    // Load Map From Params
    React.useEffect(() => {

        // Get ID from URL Params
        const params = new URLSearchParams(window.location.search);
        if (!params.has("id"))
            return;
        const id = params.get("id") as GUID;

        // Toast loading message
        const toastID = toaster.info(t("embed.loadingMap"));

        // Load Map
        importMapFromID(id).then((map) => {

            // Remove ID Param
            params.delete("id");
            window.history.replaceState({}, "", `?${params.toString()}`);

            // Dismiss loading toast
            toaster.dismiss(toastID);

            // Show success message
            toaster.success(t("embed.loadedMap", {name: map.name, author: map.properties.authorName ?? "Unknown"}));
        }).catch(toaster.error);
    }, []);

    return null;
}