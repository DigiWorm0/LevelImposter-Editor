import {mapAtom} from "../../../editor/state/documentStore";
import MapCard from "../../utils/MapCard";
import React from "react";
import useMapThumbnailURL from "../../../hooks/firebase/publish/useMapThumbnailURL";
import {useAtomValue} from "jotai";

export default function PublishModalUploadPreview() {
    const map = useAtomValue(mapAtom);
    const thumbnailURL = useMapThumbnailURL();

    return (
        <MapCard
            map={{
                ...map,
                thumbnailURL
            }}
        />
    );
}