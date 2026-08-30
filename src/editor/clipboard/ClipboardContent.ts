import GUID from "../../types/common/GUID";
import LIAnimKeyframe from "../../types/li/LIAnimKeyframe";
import {MapElement} from "@editor/document/types/MapDocument";

export const ClipboardContentType = "text/plain";

export default interface ClipboardContent {
    elem?: MapElement[];
    focusIDs?: GUID[];

    keyframe?: LIAnimKeyframe[];
}