import GUID from "../generic/GUID";
import LIElement from "./LIElement";

export default interface LIMapExport {
    id: GUID;
    v: number;
    name: string;
    description: string;
    isPublic: boolean;
    elements: LIElement[];
}