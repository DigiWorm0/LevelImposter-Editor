import LIElement from "./LIElement";

export default interface LIMap {
    id: string;
    name: string;
    description: string;
    elements: LIElement[];
}