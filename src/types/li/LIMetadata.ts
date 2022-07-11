import GUID from "../generic/GUID";

export default interface LIMetadata {
    id: GUID;
    name: string;
    description: string;
    isPublic: boolean;
    authorID: string;
    storageURL: string;
}