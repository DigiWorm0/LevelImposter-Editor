import GUID from "../generic/GUID";

export default interface LIMetadata {
    v: number;
    id: GUID;
    name: string;
    description: string;
    isPublic: boolean;
    isVerified: boolean;
    authorID: string;
    authorName: string;
    createdAt: number;
    likeCount: number;
    thumbnailURL: string | null;
    remixOf: GUID | null;
}