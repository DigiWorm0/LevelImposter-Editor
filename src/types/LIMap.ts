import GUID from "./GUID";
import LIElement from "./LIElement";

export default interface LIMap {
    id: GUID;
    name: string;
    description: string;
    elemIDs: GUID[];
}