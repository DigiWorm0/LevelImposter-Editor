import GUID from "@/shared/types/GUID";
import MapTarget from "@/map-format/MapTarget";
import LIMapProperties from "@/map-format/LIMapProperties";

export interface MapProperties extends LIMapProperties {
    [key: string]: any;

    // Publish Metadata
    id?: GUID;
    authorID?: string;
    authorName?: string;
    remixOf?: GUID;
    thumbnailURL?: string;
    mapTarget?: MapTarget;
    description?: string;
    createdAt?: number;
    isPublic?: boolean;
}