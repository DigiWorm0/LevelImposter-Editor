import GUID from "@/types/common/GUID";
import LIAnimPropertyType from "@/types/li/LIAnimPropertyType";
import {atom} from "jotai";

export interface SelectedKeyframe {
    targetID: GUID;
    property: LIAnimPropertyType;
    keyframeID: number;
}

export const selectedKeyframeAtom = atom<SelectedKeyframe | undefined>(undefined);