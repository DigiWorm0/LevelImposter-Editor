import GUID from "../generic/GUID";

export default interface LIMetadata {
    id: GUID;
    name: string;
    description: string;
    authorID: string;
    downloadURL: string;
}