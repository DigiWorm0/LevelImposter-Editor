import GUID from "@shared/types/GUID";

const MAP_ID_PARAM = "id";

export const getMapIDFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has(MAP_ID_PARAM))
        return null;
    return params.get(MAP_ID_PARAM) as GUID;
};

export const removeMapIDFromURL = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete(MAP_ID_PARAM);
    window.history.replaceState({}, "", url.toString());
};