import GUID from "@/types/common/GUID";
import MapTarget from "@/types/li/MapTarget";
import LIMapProperties from "@/types/li/LIMapProperties";

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