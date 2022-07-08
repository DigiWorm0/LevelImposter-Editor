import GUID from "../generic/GUID";

export default interface LIMap {
    id: GUID;
    v: number;
    name: string;
    description: string;
    elementIDs: GUID[];
}