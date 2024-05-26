import React from "react";
import GUID from "../../types/generic/GUID";
import useLoadMapFromID from "../firebase/useLoadMapFromID";

// TODO: Toaster
export default function useIDParam() {
    const loadMapFromID = useLoadMapFromID();

    // Load Map From Params
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (!params.has("id"))
            return;

        const id = params.get("id") as GUID;
        loadMapFromID({ id }).then(() => {
            // Remove ID Param
            const params = new URLSearchParams(window.location.search);
            params.delete("id");
            window.history.replaceState({}, "", `?${params.toString()}`);
        }).catch(console.error);
    }, [loadMapFromID]);

    return null;
}