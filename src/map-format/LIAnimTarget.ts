import GUID from "@shared/types/GUID";
import LIAnimPropertyType from "./LIAnimPropertyType";
import LIAnimProperty from "./LIAnimProperty";


export default interface LIAnimTarget {
    id: GUID;
    properties: Partial<Record<LIAnimPropertyType, LIAnimProperty>>;
}