import { useMapValue } from "../../../hooks/map/useMap";
import MapCard from "../../utils/MapCard";
import React from "react";
import useMapThumbnailURL from "../../../hooks/firebase/publish/useMapThumbnailURL";

export default function PublishModalUploadPreview() {
    const map = useMapValue();
    const thumbnailURL = useMapThumbnailURL();

    return (
        <MapCard
            map={{
                ...map,
                thumbnailURL
            }}
        />
    )
}