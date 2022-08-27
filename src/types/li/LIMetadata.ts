import GUID from "../generic/GUID";

export const MAP_FORMAT_VER = 0;

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
}