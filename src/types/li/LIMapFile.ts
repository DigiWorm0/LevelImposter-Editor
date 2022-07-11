import GUID from "../generic/GUID";
import LIElement from "./LIElement";

export default interface LIMapFile {
    id: GUID;
    v: number;
    name: string;
    description: string;
    isPublic: boolean;
    elements: LIElement[];
}