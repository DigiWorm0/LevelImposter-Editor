import GUID from "../generic/GUID";
import LIAnimPropertyType from "./LIAnimPropertyType";
import LIAnimProperty from "./LIAnimProperty";


export default interface LIAnimTarget {
    id: GUID;
    properties: { [key in LIAnimPropertyType]: LIAnimProperty };
}