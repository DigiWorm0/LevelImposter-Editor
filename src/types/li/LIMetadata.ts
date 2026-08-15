import GUID from "../common/GUID";
import MapTarget from "./MapTarget";

export default interface LIMetadata {
    v: number; // <-- File Version
    id: GUID;
    idVersion?: number | null; // <-- Workshop Update Iteration
    name: string;
    description: string;
    isPublic: boolean;
    authorID: string;
    authorName: string;
    createdAt: number;
    likeCount?: number;
    downloadCount?: number;
    isVerified: boolean;
    thumbnailURL: string | null;
    remixOf: GUID | null;
    mapTarget: MapTarget | null;
}