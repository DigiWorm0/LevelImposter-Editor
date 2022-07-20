import GUID from "../generic/GUID";

export default interface LIMetadata {
    id: GUID;
    v: number;
    name: string;
    description: string;
    isPublic: boolean;
    isVerified: boolean;
    authorID: string;
    authorName: string;
}