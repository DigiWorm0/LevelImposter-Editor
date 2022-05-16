import GUID from "../generic/GUID";

export default interface LIMap {
    id: GUID;
    name: string;
    description: string;
    elementIDs: GUID[];
}