import {mapAtom} from "@editor/documentStore";
import MapCard from "../../utils/MapCard";
import React from "react";
import useMapThumbnailURL from "../../../hooks/firebase/useMapThumbnailURL";
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