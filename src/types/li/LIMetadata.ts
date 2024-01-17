import GUID from "../generic/GUID";

export default interface LIMetadata {
    v: number; // <-- File Version
    id: GUID;
    idVersion?: number; // <-- Workshop Update Iteration
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
}