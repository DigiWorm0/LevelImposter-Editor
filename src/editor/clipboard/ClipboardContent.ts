import GUID from "@shared/types/GUID";
import {MapElement} from "@editor/document/types/MapDocument";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";

export const ClipboardContentType = "text/plain";

export default interface ClipboardContent {
    elem?: MapElement[];
    focusIDs?: GUID[];

    keyframe?: {
        targetID: GUID;
        property: LIAnimPropertyType;
        value?: number;
    }[];
}