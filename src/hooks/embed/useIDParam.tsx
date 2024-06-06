import React from "react";
import GUID from "../../types/generic/GUID";
import useLoadMapFromID from "../firebase/useLoadMapFromID";
import useToaster from "../useToaster";
import { useTranslation } from "react-i18next";

export default function useIDParam() {
    const loadMapFromID = useLoadMapFromID();
    const toaster = useToaster();
    const { t } = useTranslation();

    // Load Map From Params
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (!params.has("id"))
            return;

        const id = params.get("id") as GUID;
        const toastID = toaster.info(t("embed.loadingMap"));
        loadMapFromID({ id }).then((map) => {
            // Remove ID Param
            const params = new URLSearchParams(window.location.search);
            params.delete("id");
            window.history.replaceState({}, "", `?${params.toString()}`);

            // Toast
            toaster.dismiss(toastID);
            toaster.success(t("embed.loadedMap", { name: map.name, author: map.authorName }));
        }).catch(toaster.error);
    }, [loadMapFromID]);

    return null;
}